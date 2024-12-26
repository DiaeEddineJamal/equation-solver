# Solveur d'Équations Différentielles ODE et PDE avec PINN et RK4

Un système distribué moderne pour la résolution d'équations différentielles ordinaires (ODE) et d'équations aux dérivées partielles (PDE) utilisant les réseaux de neurones physiques informés (PINN) et la méthode Runge-Kutta d'ordre 4, avec visualisation des résultats via Chart.js.

![Architecture Diagram Placeholder](https://i.ibb.co/5jMRyxy/Design-sans-titre-2-removebg-preview.png)

## Table des Matières
- [Aperçu de l'Architecture](#aperçu-de-larchitecture)
- [Méthodes de Résolution](#méthodes-de-résolution)
- [Composants du Système](#composants-du-système)
- [Stack Technique](#stack-technique)
- [Bibliothèques Spécialisées](#bibliothèques-spécialisées)
- [Format des Équations Supportées](#format-des-équations-supportées)
- [Mise en Route](#mise-en-route)
- [Contribution](#contribution)
- [Licence](#licence)
- [Contact](#contact)

## Aperçu de l'Architecture

Le système suit une architecture microservices avec trois composants principaux :
1. Frontend (React)
2. Middleware (microservices Spring Boot)
3. Backend de calcul (Node.js)
- ![Aperçu de l'Architecture](https://i.ibb.co/LR0PfSj/arch-project.png)
- https://github.com/user-attachments/assets/81908527-2846-4b76-8957-fbc3350fedfc


### Flux de Données
1. L'utilisateur soumet une équation via l'interface React
2. La passerelle API reçoit la requête et la route vers le microservice Spring Boot approprié
3. Le microservice transfère au solveur Node.js spécialisé
4. Les résultats remontent la chaîne et sont visualisés sous forme de graphiques

## Méthodes de Résolution

### Réseaux de Neurones Physiques Informés (PINN)
La méthode PINN utilise des réseaux de neurones profonds pour résoudre les équations différentielles en incorporant les lois physiques dans le processus d'apprentissage. Avantages :
- Gestion efficace des problèmes multidimensionnels
- Adaptabilité aux géométries complexes
- Intégration possible de données expérimentales

### Méthode Runge-Kutta d'Ordre 4 (RK4)
Méthode numérique classique offrant :
- Haute précision pour les ODE
- Stabilité numérique robuste
- Performance optimale pour les problèmes à valeur initiale

## Composants du Système

### Frontend (React)
- Interface de saisie des équations intuitive
- Visualisation des solutions avec Chart.js
- Design responsive
- Composants React réutilisables
- Communication API REST

### Middleware (Spring Boot)
- Passerelle API
- Microservices spécialisés ODE/PDE
- Validation des requêtes
- Load balancing
- Service discovery avec Eureka

### Backend de Calcul (Node.js)
- Implémentation PINN avec TensorFlow.js
- Solveur RK4 optimisé
- API RESTful
- Traitement asynchrone des calculs

## Stack Technique et Bibliothèques

### Frontend
- React 18
- TypeScript
- Chart.js pour la visualisation
- Axios pour les requêtes API
- Material-UI pour les composants

### Middleware
- Spring Boot 2.7
- Spring Cloud Gateway
- Spring Cloud Netflix (Eureka)
- Java 11+

### Backend
- Node.js 16+
- TensorFlow.js
- Express.js
- Bibliothèques mathématiques :
  - Math.js
  - Numeric.js
  - node-ode-solver

## Format des Équations Supportées

### ODE
```
dy/dt = f(t, y)
```
Exemple : 
```
dy/dt = -2*y + sin(t)
```

### PDE
```
∂u/∂t + ∂²u/∂x² = f(x, t, u)
```
Exemple :
```
∂u/∂t = 0.1*∂²u/∂x² + u*(1-u)
```

## Mise en Route

### Prérequis
- Node.js 16+
- Java JDK 11+
- Maven 3.8+
- Docker (optionnel)

### Installation

1. **Cloner le Dépôt**
```bash
git clone https://github.com/DiaeEddineJamal/equation-solver.git
cd equation-solver
```

2. **Frontend**
```bash
cd pinn-solver
npm install
npm start
```

4. **Backend**
```bash
cd nodejs-equation-solver
npm install
npm start

cd projectspring
mvn clean install
java -jar target/proxyApplicaion.jar
```

## Contribution

### Équipe de Développement

- **Chef de Projet et Développeur Principal**
  - [DIAE-EDDINE JAMAL](https://github.com/DiaeEddineJamal)

- **Développeurs**
  - [HAYTAM AATITA](https://github.com/HaithamAatita)
  - [RIM DIGHALI](https://github.com/RimDighali)
  - [ALI EL JOUALI](https://github.com/AliEljouali)
  - [BASMA BOUKHAL](https://github.com/BasmaBoukhal)

### Comment Contribuer

Nous accueillons les contributions ! Pour contribuer :

1. Forkez le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.

## Contact

Email - diae_2002@hotmail.com

Lien du projet: [https://github.com/DiaeEddineJamal/equation-solver](https://github.com/DiaeEddineJamal/equation-solver)
