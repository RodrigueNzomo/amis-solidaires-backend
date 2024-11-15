# 1. Utiliser l'image officielle de Node.js comme image de base
FROM node:16

# 2. Créer un répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# 3. Copier package.json et package-lock.json dans le répertoire de travail
COPY backend/package*.json ./

# 4. Installer les dépendances
RUN npm install

# 5. Copier tout le code source de l'application dans le conteneur
COPY backend/ .

# 6. Exposer le port que l'application va utiliser (5000 par défaut)
EXPOSE 5000

# 7. Lancer l'application Node.js
CMD ["npm", "start"]
