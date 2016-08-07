# Fonctionnalités
## Authentification
Accessible aux visiteurs. Si l’authentification est valide, le visiteur est identifié comme membre. Sinon, on reste sur cette page, avec message d’erreur
Formulaire comprenant:
les champs email (identifiant unique du visiteur)et mot de passe
Un unique bouton Se connecter. Il redirige l’utilisateur vers son état civil.

## Inscription sur le site
Accessible aux visiteurs.
Permet de créer un compte avec identifiant et mot de passe. La personne est ensuite identifiée comme inscrite.
Formulaire comprenant:
les champs email (identifiant unique du visiteur), mot de passe et confirmation du mot de passe.
Boutons enregistrer et annuler. Enregistrer sauvegarde et redirige l’utilisateur vers son état civil

## Etat civil
Accessible à la personne connectée, qui a au moins le rôle Inscrit.
Champs: nom, prénom, adresse, téléphone, identifiant (e-mail), mot de passe.
Comprend un bouton Sauvegarder, permettant d’enregistrer les modifications faites par l’utilisateur.

## Inscription aux événements
Accessible à la personne connectée, qui a au moins le rôle Inscrit et qui a rempli les champs obligatoires de son état civil.
Permet de visualiser la liste des événements auxquels le membre est inscrit.
Permet de s’inscrire à un nouvel événement, sous conditions (par exemple, on ne peut s’inscrire à un cours sur l’année X-Y que si on est déja adhérent sur cette même année)

## Reste à payer
Accessible en lecture seule aux inscrits, ayant ajouté un ou plusieurs événements
Accessible en écriture aux gestionnaires d’événement

## Ajouter un nouvel événement
Accessible aux gestionnaires d’événement.
Permet de créer un événement.
Liste les événements existants ? permet de les consulter en lecture seule ?

## Gérer l’événement X
Accessible en édition au gestionnaire d’événement qui en est l’auteur

## Trésorier
Accessible en édition aux trésoriers.
Peuvent valider les paiements des membres

## Secrétaire
Accessible en édition aux secrétaires
Permet de consulter la liste des personnes et leur état civil

# Thèmes
Champs: date de début, date de fin, nom, description, actif / inactif, autre champ requis

## Adhésion annuelle
Nécessite d’être inscrit sur le site

## Cours
Nécessite d’être membre.
Quelque soit le membre, s’inscrire à un cours pour l’année X-Y requiert d’être déjà membre, ou d’ajouter l’adhésion en pré-requis

## Festival
Ne nécessite aucun rôle particulier

## Atelier
Nécessite d’être membre.
Peut contenir différents sujets dont les critères varient:
en couple ou solo, avec chacun des niveaux différents
tarifs dégressifs suivant les formules choisies

# Rôles
## Visiteur
Rôle par défaut

## Inscrit
Rôle d’une personne inscrite sur le site

## Adhérent
Rôle d’une personne inscrite et ayant payé sa cotisation pour l’année en cours

## Gestionnaire d’événement
Rôle d’une personne organisatrice d’événement. Un événement peut être un cours (et donc le gestionnaire est le prof du cours), un atelier, un festival.

## Trésorier
Rôle de la personne gérant la trésorerie. Elle enregistre et valide les paiements des adhérents

## Secrétaire
Rôle ayant accès à l’état civil des membres. Ces données sont inaccessibles aux autres membres.


# API
## Authentification
URL: http://www.example.org/api/auth/

S'authentifier auprès du serveur et récupérer le jeton associé
Requête:
- Type: POST
- paramètes: login, password

Réponse:
- Format : JSON
- Contenu: userId, Token

Exemple de requête: curl -X POST http://www.example.org/api/auth --data="{\"login\": \"example@test.org\", \"password\": \"mySuperPassword\" }"
Exemple de réponse: {userId: 1234, token: blabla}


## Identité
URL: /api/identity/

Récupérer l'identité et les rôles de l'utilisateur courant
Requête:
- Type: GET

Réponse:
- Format: JSON

Exemple de requête: curl -X GET http://www.example.org/api/identity
Exemple de réponse: {userId: 1234, login: example@test.com}

## Profil utilisateur
URL: /api/account/

#### Récupérer le profil d'un utilisateur
Requête:
- Type: GET
- Paramètre: userId

Réponse:
- Format: JSON

Exemple de requête: curl -X GET http://www.example.org/api/account/1234
Exemple de réponse: {userId: 1234, login: example@test.com}

#### Créer un profil d'un utilisateur
Requête:
- Type: POST
- Paramètres: email, password

Réponse:
- Code: 201
- Format: JSON
- contenu: userId

Exemple de requête: curl -X POST http://www.example.org/api/account
Exemple de réponse: {"userId" : 2, "firstName": "John", "lastName": "Doe", "age": 37, "streetAddress": "22Ob Baker Street", "city": "London", "state": "UK", "postalCode": "1234"}

#### Mettre à jour le profil d'un utilisateur
Requête:
- Type: PUT
- Paramètre: userId

Réponse:
- Code: 200

Exemple de requête: curl -X PUT http://www.example.org/api/account/1234 --data="{\"userId\": 2, \"firstName\": \"John\", \"lastName\": \"Doe\", \"age\": 37, \"streetAddress\": \"22Ob Baker Street\", \"city\": \"London\", \"state\": \"UK\", \"postalCode\": \"1234\"}"

#### Mettre à jour le mot de passe d'un utilisateur
Requête:
- Type: PUT
- Paramètre: userId, password

Réponse:
- Code: 200

Exemple de requête: curl -X PUT http://www.example.org/api/account/1234 --data="{\"userId\": 2, \"password\": \"myNewPassord\"}"

## Inscriptions d'un utilisateur
URL: /api/subscription/

#### Récupérer les inscriptions d'un utilisateur
Requête:
- Paramètre: userId
- Type: GET

Réponse:
- Format: Array/JSON

Exemple de requête: curl -X GET http://www.example.org/api/subscription
Exemple de réponse: [{
  \"id\" : 1,
  \"topicId\" : 1,
  \"topicTitle\" : \"Adhésion année 2015-2016\",
  \"userId\" : 1,
  \"state\": "paid"
}]

#### Ajouter une inscription d'un utilisateur
Requête:
- Type: POST
- Paramètres: topicId, userId

Réponse:
- Code: 200
- Contenu: subscriptionId

Exemple de requête: curl -X POST http://www.example.org/api/subscription
Exemple de réponse: {subscriptionId: 1234}

#### Annuler une inscription d'un utilisateur
Requête:
- Type: DELETE
- Paramètres: subscriptionId

Réponse:
- Code: 200

Exemple de requête: curl -X PUT http://www.example.org/api/subscription/1234

#### Mettre à jour le partenaire dans une inscription en couple d'un utilisateur
Requête:
- Type: PUT
- Paramètres: subscriptionId

Réponse:
- Code: 200

Exemple de requête: curl -X PUT http://www.example.org/api/subscription

#### Mettre à jour le reste à payer d'une inscription d'un utilisateur
Requête:
- Type: PUT
- Paramètres: subscriptionId

Réponse:
- Code: 200

Exemple de requête: to be defined

## Gestion d'une année
URL: http://www.example.org/api/year/

#### Récupérer les années
Requête:
- Type: GET

Réponse:
- Format: Array/JSON

Exemple de requête: curl -X GET http://www.example.org/api/year
Exemple de réponse: [{id: 2015, title: "Année 2015-2016"}]

#### Récupérer les informations d'une année
Requête:
- Type: GET
- Paramètre: yearId

Réponse:
- Format: JSON

Exemple de requête: curl -X GET http://www.example.org/api/year/2015
Exemple de réponse: {id: 2015, title: "Année 2015-2016"}

#### Ajouter une année
Requête:
- Type: POST

Réponse:
- Code: 200
- Contenu: yearId

Exemple de requête: curl -X POST http://www.example.org/api/year
Exemple de réponse: {id: 2016}

#### Mettre à jour une année
Requête:
- Type: PUT
- Paramètre: yearId

Réponse:
- Code: 200

Exemple de requête: curl -X PUT http://www.example.org/api/year --data="{\"title\": \"Année 2015-2016\"}"

## Gestion d'une sujet
URL: /api/topic/

#### Récupérer les sujets
Requête:
- Type: GET

Réponse:
- Format: Array/JSON

Exemple de requête: curl -X GET http://www.example.org/api/topic
Exemple de réponse: [{id: 1234, "title": "Adhésion pour l'année 2015-2016"}]

#### Récupérer les informations d'un sujet à partir de son identifiant
Requête:
- Type: GET
- Paramètre: topicId

Réponse:
- Format: JSON

Exemple de requête: curl -X GET http://www.example.org/api/topic
Exemple de réponse: {id: 1234, "title": "Adhésion pour l'année 2015-2016"}

#### Ajouter un sujet
Requête:
- Type: POST

Réponse:
- Code: 200
- Contenu: topicId

Exemple de requête: curl -X POST http://www.example.org/api/topic --data="{\"title\": \"Adhésion pour l'année 2015-2016\", \"yearId\": 2015 }"
Exemple de réponse: {id: 1234}

#### Mettre à jour un sujet
Requête:
- Type: PUT

Réponse:
- Code: 200

Exemple de requête: curl -X PUT http://www.example.org/api/topic --data="{\"id\": 1234, \"title\": \"Adhésion pour l'année 2015-2016\", \"yearId\": 2015}"

#### Supprimer un sujet
Requête:
- Type: DELETE
- Paramètre: topicId

Réponse:
- Code: 200

Exemple de requête: curl -X GET http://www.example.org/api/topic/1234
