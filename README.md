# Dayflow 🌊

**Planifiez votre journée. Traversez-la.**

Dayflow est une application web intelligente de planification de journée qui organise automatiquement vos tâches selon votre niveau d'énergie naturel.

## ✨ Fonctionnalités

- 📝 **Ajout de tâches** : Créez des tâches avec durée estimée et niveau d'énergie requis
- 🧠 **Organisation intelligente** : L'algorithme place automatiquement les tâches difficiles quand votre énergie est élevée
- 📊 **Timeline visuelle** : Suivez votre journée avec une timeline colorée et intuitive
- 📈 **Statistiques** : Consultez vos statistiques de productivité
- 🌍 **Multilingue** : Disponible en français et en anglais
- 🔐 **Comptes utilisateurs** : Connexion / inscription sécurisée via Supabase
- ☁️ **Synchro multi‑appareils** : Vos tâches sont associées à votre compte et disponibles sur tous vos navigateurs
- 💾 **Persistance locale** : Les utilisateurs non connectés conservent leurs données dans le navigateur
- 📱 **Responsive** : Fonctionne parfaitement sur mobile, tablette et desktop

## 🚀 Technologies

- **React 19** + **TypeScript**
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Styling moderne et responsive
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes élégantes

## 📦 Installation

```bash
# Cloner le repository
git clone <votre-repo>
cd dayflow

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 🏗️ Build

```bash
# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
## 📁 Structure du projet

```
dayflow/
├── src/
│   ├── components/      # Composants React réutilisables
│   ├── contexts/        # Contextes React (i18n, auth)
│   ├── hooks/           # Hooks personnalisés
│   ├── i18n/            # Traductions (fr, en)
│   ├── pages/           # Pages de l'application (home, planner, auth)
│   ├── types/           # Types TypeScript
│   └── utils/           # Utilitaires
├── public/                # Assets statiques
├── dist/                  # Build de production (généré)
└── vercel.json            # Configuration Vercel
```

## 🔐 Authentification & synchro

Dayflow utilise **Supabase** pour :

- gérer les comptes utilisateurs (email + mot de passe, email de confirmation)
- stocker les tâches dans une base **PostgreSQL** sécurisée
- appliquer des règles de sécurité par utilisateur (Row Level Security)

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=VOTRE_CLE_ANON
```

Les utilisateurs :

- **non connectés** : les tâches sont stockées en `localStorage`
- **connectés** : les tâches sont chargées et sauvegardées dans la table `tasks` de Supabase

## 🎨 Personnalisation

### Couleurs

Les couleurs peuvent être personnalisées dans `tailwind.config.js` :

```js
colors: {
  primary: { /* ... */ },
  accent: { /* ... */ }
}
```

### Traductions

Les traductions sont dans `src/i18n/translations.ts`. Pour ajouter une nouvelle langue :

1. Ajoutez le code de langue dans le type `Language`
2. Ajoutez les traductions dans l'objet `translations`

## 📝 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Build pour la production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Lance le linter ESLint

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

**Faouzaith Idrissou**

- Portfolio: [my-portfolio-sandy-alpha-69.vercel.app](https://my-portfolio-sandy-alpha-69.vercel.app)
- GitHub: [@Faouziath773](https://github.com/Faouziath773)
- LinkedIn: [faouziath-idriss](https://www.linkedin.com/in/faouziath-idriss-a982b5215)

---

Made with ❤️ by Faouzaith Idrissou
