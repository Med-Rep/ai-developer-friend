
export const VOICE_AND_SUGGESTIONS_TEST_LOCATIONS = {
  // Pages principales
  GLOBAL_HEADER: {
    location: "En-tête principal > Barre de recherche globale",
    description: "Barre de recherche dans l'en-tête avec microphone",
    testSteps: ["Cliquer sur l'icône microphone", "Parler", "Vérifier la transcription"]
  },
  
  // Section Textes Juridiques
  LEGAL_SEARCH: {
    location: "Textes Juridiques > Recherche > Champs de recherche",
    description: "Tous les champs de recherche dans les onglets de textes juridiques",
    testSteps: ["Aller à 'Textes Juridiques'", "Cliquer sur 'Recherche'", "Tester le champ principal"]
  },
  
  LEGAL_ADVANCED_FILTERS: {
    location: "Textes Juridiques > Recherche > Filtres avancés",
    description: "Champ de recherche principal dans les filtres avancés",
    testSteps: ["Cliquer sur 'Filtres avancés'", "Tester le champ 'Recherche'"]
  },
  
  // Section Procédures
  PROCEDURES_SEARCH: {
    location: "Procédures > Recherche > Champs de recherche",
    description: "Tous les champs de recherche dans les procédures",
    testSteps: ["Aller à 'Procédures'", "Cliquer sur 'Recherche'", "Tester les champs"]
  },
  
  // Recherches sauvegardées
  SAVED_SEARCHES: {
    location: "Recherches sauvegardées > Filtre de recherche",
    description: "Champ de recherche dans les recherches sauvegardées",
    testSteps: ["Aller à 'Recherches sauvegardées'", "Tester le champ de filtre"]
  },
  
  // Assistant IA
  AI_ASSISTANT: {
    location: "Assistant IA > Champ de question",
    description: "Champ principal de l'assistant IA juridique",
    testSteps: ["Aller à 'Assistant IA'", "Tester le grand champ de saisie"]
  },
  
  // Recherche unifiée
  UNIFIED_SEARCH: {
    location: "Recherche avancée > Interface de recherche unifiée",
    description: "Champs de recherche dans chaque onglet",
    testSteps: ["Aller à 'Recherche avancée'", "Tester chaque onglet"]
  },
  
  // Formulaires
  FORM_FIELDS: {
    location: "Formulaires > Tous les champs de saisie",
    description: "Champs dans les formulaires d'ajout/modification",
    testSteps: ["Ouvrir un formulaire", "Tester chaque champ de texte"]
  }
};

export function getTestInstructions() {
  return Object.entries(VOICE_AND_SUGGESTIONS_TEST_LOCATIONS).map(([key, config]) => ({
    id: key,
    ...config
  }));
}
