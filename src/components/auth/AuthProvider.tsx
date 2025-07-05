
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { securityMonitor } from '@/utils/enhancedSecurity';
import { useToast } from '@/hooks/use-toast';
import { testAccounts, validateTestCredentials, isTestAccount } from '@/utils/testAccounts';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check if it's a test account first
          const testAccount = isTestAccount(session.user.email || '');
          if (testAccount) {
            setUserRole(testAccount.role);
            
            // Log security event for test accounts
            securityMonitor.logSecurityEvent('test_user_login', {
              userId: session.user.id,
              email: session.user.email,
              role: testAccount.role,
              timestamp: new Date().toISOString()
            });
          } else {
            // Fetch user role for regular accounts
            setTimeout(async () => {
              try {
                const { data: roleData } = await supabase.rpc('get_current_user_role');
                setUserRole(roleData);
                
                // Log security event
                securityMonitor.logSecurityEvent('user_login', {
                  userId: session.user.id,
                  email: session.user.email,
                  timestamp: new Date().toISOString()
                });
              } catch (error) {
                console.error('Error fetching user role:', error);
              }
            }, 0);
          }
        } else {
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      // Check if it's a test account
      const testAccount = isTestAccount(email);
      if (testAccount) {
        return { error: { message: 'Ce compte de test existe déjà. Utilisez la connexion.' } };
      }

      // Validate input for non-test accounts
      const validation = securityMonitor.validateInput(email, 'email');
      if (!validation.isValid) {
        return { error: { message: 'Email invalide détecté' } };
      }

      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (error) {
        securityMonitor.logSecurityEvent('signup_failed', {
          email,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        
        return { error };
      }

      toast({
        title: "Inscription réussie",
        description: "Vérifiez votre email pour confirmer votre compte.",
      });

      return { error: null };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Check if it's a test account first
      const testAccount = validateTestCredentials(email, password);
      if (testAccount) {
        // Create a complete mock user object for test accounts
        const mockUser: User = {
          id: `test-${testAccount.role}`,
          aud: 'authenticated',
          role: 'authenticated',
          email: testAccount.email,
          email_confirmed_at: new Date().toISOString(),
          phone: '',
          confirmed_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          app_metadata: {
            provider: 'test',
            providers: ['test']
          },
          user_metadata: {
            first_name: testAccount.firstName,
            last_name: testAccount.lastName
          },
          identities: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const mockSession: Session = {
          user: mockUser,
          access_token: 'test-token',
          token_type: 'Bearer',
          expires_in: 3600,
          expires_at: Math.floor(Date.now() / 1000) + 3600,
          refresh_token: 'test-refresh'
        };

        setSession(mockSession);
        setUser(mockUser);
        setUserRole(testAccount.role);

        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${testAccount.firstName} ! (Compte de test)`,
        });

        return { error: null };
      }

      // Validate input for regular accounts
      const validation = securityMonitor.validateInput(email, 'email');
      if (!validation.isValid) {
        return { error: { message: 'Email invalide détecté' } };
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        securityMonitor.logSecurityEvent('login_failed', {
          email,
          error: error.message,
          timestamp: new Date().toISOString()
        });

        return { error };
      }

      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'application !",
      });

      return { error: null };
    } catch (error: any) {
      console.error('Signin error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      if (user) {
        // Check if it's a test account
        const testAccount = isTestAccount(user.email || '');
        if (testAccount) {
          // For test accounts, just clear the state
          setSession(null);
          setUser(null);
          setUserRole(null);
          
          toast({
            title: "Déconnexion réussie",
            description: "À bientôt !",
          });
          return;
        }

        securityMonitor.logSecurityEvent('user_logout', {
          userId: user.id,
          email: user.email,
          timestamp: new Date().toISOString()
        });
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (error) {
      console.error('Signout error:', error);
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      if (!user) return { error: { message: 'Utilisateur non connecté' } };

      // Check if it's a test account
      const testAccount = isTestAccount(user.email || '');
      if (testAccount) {
        toast({
          title: "Profil de test",
          description: "Les comptes de test ne peuvent pas être modifiés.",
        });
        return { error: { message: 'Les comptes de test ne peuvent pas être modifiés' } };
      }

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) return { error };

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées.",
      });

      return { error: null };
    } catch (error: any) {
      console.error('Profile update error:', error);
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      userRole,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
