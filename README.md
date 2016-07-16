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