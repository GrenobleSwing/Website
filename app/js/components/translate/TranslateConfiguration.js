function TranslateConfiguration($translateProvider) {
  $translateProvider.translations('fr', {
    'LOGIN' : {
      'TITLE' : 'Déja membre ?',
      'SIGNUP': 'Nouveau membre ?',
      'MESSAGE': 'La création d\'un compte est gratuite et sans aucune obligation de votre part. Avoir un compte chez nous vous donne accès à votre espace personnel pour suivre votre information en temps réel.'
    },
    'SIGNUP': {
      'TITLE': 'Créer un compte'
    },
    'ACCOUNT': {
      'ADDRESS': 'Adresse',
      'CITY' : 'Ville',
      'COUNTRY' : 'Pays',
      'EMAIL' : 'Courriel',
      'EMAIL_REQUIRED': 'Le courriel est requis',
      'FEMALE' : 'Femme',
      'FIRSTNAME' : 'Prénom',
      'FIRSTNAME_REQUIRED' : 'le prénom est requis',
      'FOLLOWER' : 'Follower',
      'GENDER' : 'Genre',
      'LASTNAME' : 'Nom',
      'LASTNAME_REQUIRED' : 'le nom est requis',
      'LEADER': 'Leader',
      'MALE' : 'Homme',
      'PASSWORD': 'Mot de passe',
      'PASSWORD_REQUIRED': 'Le mot de passe est requis',
      'PASSWORD_CONFIRM': 'Confirmation du mot de passe',
      'PASSWORD_CONFIRM_REQUIRED': 'Le mot de passe est erroné',
      'PRIMARY_ROLE': 'Rôle principal',
      'SPECIAL': 'Cochez cette case si vous avez un régime spécial (étudiant, chômeur, retraité)',
      'TITLE': 'Etat civil',
      'ZIPCODE' : 'Code postal'
    },
    'SUBSCRIPTIONS' : {
      'TITLE': 'Inscriptions',
    },
    'BALANCE' : {
      'TITLE': 'Solde',
    },
    'PASSWORD' : {
      'TITLE': 'Mot de passe',
    },
    'TOPICS' : {
      'TITLE': 'Thèmes',
    },
    'ACTION' : {
      'SAVE' : 'Enregistrer',
      'CONNECT' : 'Ouvrir une session',
      'SIGNUP' : 'Continuer',
      'CHANGE' : 'Modifier',
      'CANCEL' : 'Annuler'
    }
  });
  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider.preferredLanguage('fr');
}
