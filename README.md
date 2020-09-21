# IBanFirst Account List

Ce project a été creé avec [Create React App](https://github.com/facebook/create-react-app).

# Pile technologique:

  - Typescript
  - Material-ui
  

# Architecture:
Un dossier nommé "account" a été crée pour représenter la liste des comptes.Il est composé de 4 parties:
* API
* Composant principale(AccountList)
* Styles
* Models: (interfaces)

> Pour la simplicité de ce projet, j'ai éviter d'utiliser Redux, ou de créer des dossier pour contenir les fichiers.

# Comment ça marche:
Dés le démarrage de la page, un **fetch** vers l'api va être émis, si il y a pas d'erreur au niveau de réponse, la table va être affiché, si non un alert d'erreur va apparaître contenant un message d'erreur.
On changeant le devise dans la select, un autre appel api va être émis, entre temps un loading s'affichera jusqu'à une réponse est reçu. 

## Installation

Installez les dépendances et devDependencies et démarrez le serveur avec **npm** ou **yarn**.

```sh
$ git clone https://github.com/seifallah/ibanFirst-test.git
$ npm i
$ npm start
```

Pour lancer le test dans App.test.tsx:
Dans ce fichier, j'ai testé que l'Euro est la devise par défaut, et qu'il n'existe pas un alert d'erreur 

```sh
$ npm test
```

**Merci !**
