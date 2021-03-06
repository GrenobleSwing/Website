function TranslateConfiguration($translateProvider) {
  $translateProvider.translations('fr', {
    'LOGIN' : {
      'TITLE' : 'Déja membre ?',
      'SIGNUP': 'Nouveau membre ?',
      'MESSAGE': 'La création d\'un compte est gratuite et sans aucune obligation de votre part. Avoir un compte chez nous vous donne accès à votre espace personnel pour suivre votre information en temps réel.'
    },
    'SIGNUP': {
      'TITLE': 'Créer un compte',
      'REGISTER_SUCCESSFUL' : 'Votre compte a été créé avec succès.'
    },
    'ACCOUNT': {
      // 'ADDRESS': 'Adresse',
      // 'CITY' : 'Ville',
      // 'COUNTRY' : 'Pays',
      'EMAIL' : 'Courriel',
      // 'EMAIL_REQUIRED': 'Le courriel est requis',
      // 'FEMALE' : 'Femme',
      // 'FIRSTNAME' : 'Prénom',
      // 'FIRSTNAME_REQUIRED' : 'le prénom est requis',
      // 'FOLLOWER' : 'Follower',
      // 'GENDER' : 'Genre',
      // 'LASTNAME' : 'Nom',
      // 'LASTNAME_REQUIRED' : 'le nom est requis',
      // 'LEADER': 'Leader',
      // 'MALE' : 'Homme',
      'PASSWORD': 'Mot de passe',
      'PASSWORD_NEW': 'Nouveau mot de passe',
      'PASSWORD_OLD': 'Ancien mot de passe',
      'PASSWORD_REQUIRED': 'Le mot de passe est requis.',
      'PASSWORD_FAILED': 'Le mot de passe est erroné. Veuillez réessayer.',
      'PASSWORD_CONFIRM': 'Confirmation du mot de passe',
      'PASSWORD_CONFIRM_REQUIRED': 'Le mot de passe est erroné',
      // 'PHONE': 'Téléphone',
      // 'PRIMARY_ROLE': 'Rôle préféré',
      // 'RECOVERY': 'Récupération du compte',
      // 'SPECIAL': 'Cochez cette case si vous avez un régime spécial (étudiant, chômeur, retraité)',
      // 'TITLE': 'Etat civil',
      // 'ZIPCODE' : 'Code postal',
      'SAVE_SUCCESSFUL' : 'Mise à jour réalisée avec succès.',
      'SAVE_FAILED' : 'Une erreur s\'est produite lors de la mise à jour.'
    },
    'SUBSCRIPTIONS' : {
      'TITLE': 'Inscriptions',
      'NO_TOPIC' : 'pas de cours/niveau ouvert pour le moment'
    },
    'BALANCE' : {
      'TITLE': 'Solde',
    },
    'PASSWORD' : {
      'TITLE': 'Mot de passe',
      'PWD_REQUIRED': 'Ce champ est requis.',
      'PWD_TOO_SHORT': 'doit comporter 6 caractères minimum.',
      'PWD_TOO_LONG': 'doit comporter 16 caractères maximum.',
      'PWD_NEEDS_LETTERS': 'doit comporter au moins 1 lettre.',
      'PWD_NEEDS_NUMBERS': 'doit comporter au moins 1 chiffre.',
      'PWD_CONFIRM_FAILED': 'doit être identique au mot de passe.'
    },
    'TOPICS' : {
      'TITLE': 'Thèmes',
    },
    'ACTION' : {
      'SAVE' : 'Enregistrer',
      'CONNECT' : 'Ouvrir une session',
      'SIGNUP' : 'Continuer',
      'CHANGE' : 'Modifier',
      'CANCEL' : 'Annuler',
      'BACK_TO_LOGIN' : 'Retourner sur la page d\'authentification',
      'FORGOT_PASSWORD' : 'Mot de passe oublié ?',
      'RESET_PASSWORD' : 'Réinitialiser mon mot de passe'
    },
    'SUBMITTED' : 'Demande transmise.',
    'WAITING' : 'En attente de validation.',
    'VALIDATED' : 'Validé. En attente de paiement.',
    'PAID' : 'Payé.',
    'UNPICKED' : '',
    'OK' : 'OK',
    'leader' : 'Leader',
    'follower' : 'Follower',
    'open' : 'Ouvert',
    'draft' : 'Brouillon'
  });
  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.preferredLanguage('fr');
}
