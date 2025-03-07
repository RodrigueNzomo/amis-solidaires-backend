# amis-solidaires-backend
Bien sûr ! Voici le `README.md` réajusté en français, avec des explications techniques détaillées concernant l'utilisation des différentes stratégies et outils dans votre projet backend :

---

# Backend du projet Amis Solidaires

Ce répertoire contient le code backend du projet **Amis Solidaires**. Le backend est développé avec **Node.js** et utilise **MongoDB** pour la gestion des données. Ce `README.md` fournit des informations sur la structure du projet, les étapes d'installation, ainsi que les outils et méthodes utilisés.

## Table des matières

- [Technologies Utilisées](#technologies-utilisées)
- [Structure du Projet](#structure-du-projet)
- [Installation](#installation)
- [Variables d'Environnement](#variables-denvironnement)
- [Lancer l'Application](#lancer-lapplication)
- [Configuration Docker](#configuration-docker)
- [Routes](#routes)
- [Middlewares](#middlewares)
- [Modèles](#modèles)
- [Contrôleurs](#contrôleurs)
- [Validateurs](#validateurs)
- [Services](#services)

## Technologies Utilisées

- **Node.js** : Environnement d'exécution JavaScript côté serveur. Nous l'utilisons car il permet de développer des applications backend performantes et scalables.
- **Express.js** : Framework minimaliste pour Node.js, permettant de créer des API RESTful de manière rapide et flexible. Express simplifie la gestion des routes et des middlewares.
- **MongoDB** : Base de données NoSQL. Elle est choisie pour sa flexibilité et sa scalabilité, ce qui est idéal pour des projets qui nécessitent de traiter de grandes quantités de données non structurées.
- **Mongoose** : ODM (Object Data Modeling) pour MongoDB et Node.js, facilitant les interactions avec la base de données MongoDB et la gestion des modèles de données.
- **JWT (JSON Web Token)** : Utilisé pour l'authentification et l'autorisation des utilisateurs. Il permet de sécuriser les routes de l'API en validant les tokens d'accès envoyés par le client.
- **Nodemon** : Outil qui surveille les changements dans le code source et redémarre automatiquement le serveur pendant le développement.
- **Bcryptjs** : Librairie pour le hachage des mots de passe, garantissant leur sécurité lors du stockage dans la base de données.
- **Validator** : Outil permettant de valider les données entrantes afin de prévenir les injections de code et garantir la conformité des données avant traitement.
- **Docker** : Utilisé pour containeriser l'application backend et garantir une configuration cohérente, quel que soit l'environnement.

## Structure du Projet

Le projet est organisé de manière modulaire pour favoriser la maintenance et la scalabilité. Voici l'architecture des répertoires :

```
backend/
│
├── config/
│   ├── config.js            # Paramètres de configuration (ex : URI MongoDB)
│   ├── db.js                # Connexion à la base de données MongoDB
│   ├── jwt.js               # Configuration du JWT (secret, etc.)
│
├── controllers/             # Contrôleurs pour la gestion des entités
│   ├── aideController.js
│   ├── cotisationController.js
│   ├── membreController.js
│   ├── paymentController.js
│   ├── pretController.js
│   ├── roleController.js
│   ├── userController.js
│
├── middleware/              # Middlewares pour la validation et la sécurité
│   ├── authMiddleware.js
│   ├── checkRoleMiddleware.js
│   ├── errorHandlerMiddleware.js
│
├── models/                  # Modèles Mongoose pour la gestion des entités
│   ├── Aide.js
│   ├── Cotisation.js
│   ├── Membre.js
│   ├── Payment.js
│   ├── Pret.js
│   ├── User.js
│
├── routes/                  # Routes API
│   ├── aideRoutes.js
│   ├── cotisationRoutes.js
│   ├── membreRoutes.js
│   ├── paymentRoutes.js
│   ├── pretRoutes.js
│   ├── roleRoutes.js
│   ├── userRoutes.js
│
├── services/                # Services externes (email, notifications)
│   ├── emailService.js
│   ├── invoiceService.js
│   ├── notificationService.js
│   ├── paymentService.js
│
├── utils/                   # Utilitaires (validations, etc.)
│   ├── authValidators.js
│   ├── customValidators.js
│   ├── dataValidators.js
│   ├── roleValidators.js
│   ├── validators.js
│
├── .dockerignore            # Fichiers à ignorer lors de la construction de l'image Docker
├── .env                     # Variables d'environnement (ex : URI MongoDB)
├── app.js                   # Point d'entrée de l'application
├── docker-compose.yml       # Configuration Docker Compose pour les conteneurs
├── Dockerfile               # Dockerfile pour construire l'image de l'application
├── package.json             # Dépendances du projet
└── package-lock.json        # Verrouillage des versions des dépendances
```

## Installation

1. **Clonez le dépôt** :

   ```bash
   git clone https://github.com/ton-utilisateur/amis-solidaires-backend.git
   cd amis-solidaires-backend
   ```

2. **Installez les dépendances** :

   Si vous utilisez `npm` ou `yarn`, installez les dépendances :

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

3. **Configurez les variables d'environnement** :

   Créez un fichier `.env` à la racine du projet et configurez les variables suivantes :

   ```env
   MONGODB_URI=mongodb://localhost:27017/amis-solidaires
   JWT_SECRET=ton_secret_jwt
   PORT=5000
   ```

## Variables d'Environnement

Le projet nécessite les variables d'environnement suivantes :

- **MONGODB_URI** : URI de connexion à la base de données MongoDB.
- **JWT_SECRET** : Clé secrète pour signer les tokens JWT.
- **PORT** : Port sur lequel le serveur sera exécuté (par défaut 5000).

## Lancer l'Application

1. **Lancer le serveur** avec `npm run dev` pour démarrer le serveur avec `nodemon` :

   ```bash
   npm run dev
   ```

   Cela démarrera le serveur à l'adresse `http://localhost:5000`.

## Configuration Docker

### 1. **Construire et exécuter avec Docker** :

Si vous souhaitez exécuter le backend dans un conteneur Docker, vous pouvez suivre ces étapes :

1. **Construire l'image Docker** :

   ```bash
   docker build -t amis-solidaires-backend .
   ```

2. **Lancer le conteneur Docker** :

   ```bash
   docker-compose up --build
   ```

### 2. **Docker Compose** :

Le projet inclut un fichier `docker-compose.yml` pour configurer à la fois le backend et la base de données MongoDB dans des conteneurs distincts.

```yaml
version: "3.7"
services:
  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/amis-solidaires
      - JWT_SECRET=ton_secret_jwt
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    volumes:
      - ./data/db:/data/db
    ports:
      - "27017:27017"
```

## Routes

Les routes disponibles dans l'API sont les suivantes :

- **/api/membres** : Gère les membres.
- **/api/cotisations** : Gère les cotisations (contributions).
- **/api/prets** : Gère les prêts.
- **/api/aides** : Gère les aides.
- **/api/payments** : Gère les paiements.
- **/api/roles** : Gère les rôles et permissions des utilisateurs.

## Middlewares

Les middlewares utilisés pour sécuriser l'application et valider les entrées des utilisateurs sont les suivants :

- **authMiddleware.js** : Vérifie le JWT et authentifie l'utilisateur.
- **checkRoleMiddleware.js** : Vérifie si l'utilisateur a le rôle approprié pour accéder à une route spécifique.
- **errorHandlerMiddleware.js** : Gère les erreurs et renvoie des réponses appropriées au client.

## Modèles

Les modèles Mongoose utilisés pour interagir avec la base de données sont les suivants :

- **Aide.js** : Modèle pour la gestion des aides.
- **Cotisation.js** : Modèle pour la gestion des cotisations.
- **Membre.js** : Modèle pour la gestion des membres.
- **Payment.js** : Modèle pour la gestion des paiements.
- **Pret.js** : Modèle pour la gestion des prêts.
- **User.js** : Modèle pour la gestion des utilisateurs.

## Contrôleurs

Les contrôleurs gèrent la logique métier et les interactions avec les modèles :

- **aideController.js**
- **cotisationController.js

**
- **membreController.js**
- **paymentController.js**
- **pretController.js**
- **roleController.js**
- **userController.js**

## Validateurs

Des validateurs personnalisés sont utilisés pour valider les données avant qu'elles ne soient envoyées à la base de données. Cela permet de prévenir les erreurs et d'assurer l'intégrité des données :

- **authValidators.js**
- **customValidators.js**
- **dataValidators.js**
- **roleValidators.js**
- **validators.js**

## Services

Les services gèrent les interactions externes comme l'envoi d'emails ou la gestion des notifications :

- **emailService.js** : Envoie des emails aux utilisateurs.
- **invoiceService.js** : Gère la génération des factures.
- **notificationService.js** : Envoie des notifications aux utilisateurs.
- **paymentService.js** : Gère les paiements.

---

Ce `README.md` offre un guide complet pour comprendre et déployer votre backend, de la configuration initiale à l'exécution en Docker. Vous pouvez personnaliser ce fichier en fonction des ajustements spécifiques de votre projet