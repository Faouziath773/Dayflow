# Dayflow 🌊

**Planifiez votre journée. Traversez-la.**

Dayflow est une application web intelligente de planification de journée qui organise automatiquement vos tâches selon votre niveau d'énergie naturel.

## ✨ Fonctionnalités

- 📝 **Ajout de tâches** : Créez des tâches avec durée estimée et niveau d'énergie requis
- 🧠 **Organisation intelligente** : L'algorithme place automatiquement les tâches difficiles quand votre énergie est élevée
- 📊 **Timeline visuelle** : Suivez votre journée avec une timeline colorée et intuitive
- 📈 **Statistiques** : Consultez vos statistiques de productivité
- 🌍 **Multilingue** : Disponible en français et en anglais
- 💾 **Persistance locale** : Vos données sont sauvegardées dans le navigateur
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
```

## 🚀 Déploiement sur Vercel

### Option 1 : Via l'interface Vercel (Recommandé)

1. **Connecter votre repository GitHub**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "New Project"
   - Importez votre repository GitHub

2. **Configuration automatique**
   - Vercel détectera automatiquement que c'est un projet Vite
   - Les paramètres suivants seront appliqués automatiquement :
     - **Framework Preset** : Vite
     - **Build Command** : `npm run build`
     - **Output Directory** : `dist`
     - **Install Command** : `npm install`

3. **Déployer**
   - Cliquez sur "Deploy"
   - Votre application sera disponible en quelques secondes !

### Option 2 : Via Vercel CLI

```bash
# Installer Vercel CLI globalement
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

## 📁 Structure du projet

```
dayflow/
├── src/
│   ├── components/      # Composants React réutilisables
│   ├── contexts/         # Contextes React (i18n)
│   ├── hooks/            # Hooks personnalisés
│   ├── i18n/             # Traductions (fr, en)
│   ├── pages/            # Pages de l'application
│   ├── types/            # Types TypeScript
│   └── utils/             # Utilitaires
├── public/                # Assets statiques
├── dist/                  # Build de production (généré)
└── vercel.json            # Configuration Vercel
```

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
