
// Comptes de test pour l'application
export interface TestAccount {
  email: string;
  password: string;
  role: 'admin' | 'juriste' | 'citoyen';
  firstName: string;
  lastName: string;
}

export const testAccounts: TestAccount[] = [
  {
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'Test'
  },
  {
    email: 'juriste@test.com',
    password: 'juriste123',
    role: 'juriste',
    firstName: 'Juriste',
    lastName: 'Test'
  },
  {
    email: 'citoyen@test.com',
    password: 'citoyen123',
    role: 'citoyen',
    firstName: 'Citoyen',
    lastName: 'Test'
  }
];

export const isTestAccount = (email: string): TestAccount | null => {
  return testAccounts.find(account => account.email === email) || null;
};

export const validateTestCredentials = (email: string, password: string): TestAccount | null => {
  const account = testAccounts.find(acc => acc.email === email && acc.password === password);
  return account || null;
};
