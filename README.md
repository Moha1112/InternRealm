# InternRealm - Frontend

## Description

Ce projet correspond à la partie frontend de la plateforme web **InternRealm**, dédiée à la gestion complète du cycle de stage.  
Il a été développé avec **React.js** et utilise **Vite** comme bundler pour un rendu rapide et optimisé.

---

## Technologies utilisées

- **React.js** : bibliothèque JavaScript pour construire l’interface utilisateur.
- **Vite** : outil de build rapide pour les projets frontend modernes.
- **Tailwind CSS** (si utilisé) : framework CSS utilitaire pour un style rapide et responsive.

---

## Installation

1. Cloner le dépôt frontend :
```bash
   git clone https://github.com/MohaIfk/InternRealm.git
````

2. Installer les dépendances :

```bash
   cd internRealm-frontend
   npm install
```

3. Démarrer le serveur de développement :

```bash
   npm run dev
```

4. Ouvrir le navigateur sur :

```
   http://localhost:5173
```

---

## Scripts utiles

| Commande          | Description                                         |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Démarre le serveur de développement avec hot reload |
| `npm run build`   | Compile le projet pour la production                |
| `npm run preview` | Prévisualise la build de production locale          |

---

## Configuration

* L’URL de l’API backend est configurable dans le fichier `.env` ou dans le fichier de configuration spécifique (`src/config.js` ou équivalent).
* Veillez à ce que le backend Django soit démarré et accessible pour que le frontend fonctionne correctement.

---

## Structure du projet

* `src/` : code source React (composants, pages, services)
* `public/` : fichiers statiques (images, favicon)
* `vite.config.js` : configuration Vite

---

## Contribution

Pour contribuer, veuillez créer une branche à partir de `main`, effectuer vos modifications puis ouvrir une Pull Request.

---

## Licence

Ce projet est sous licence MIT.

---

## Contact

Pour toute question, merci de contacter **\[Mohammed Benzahouane]** à l’adresse email : \[[mohammed.benzahouane@uit.ac.ma](mohammed.benzahouane@uit.ac.ma)]
