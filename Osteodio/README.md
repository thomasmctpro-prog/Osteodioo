# Osteodio - Application d'Ostéopathie Animale

Application mobile et web pour les ostéopathes animaliers.

## Installation

```bash
# Installer les dépendances
npm install
```

## Développement

```bash
# Lancer le serveur de développement
npm run dev
```

## Build Web (PWA)

```bash
# Construire l'application web
npm run build
```

Pour tester en local:

```bash
npm run preview
```

## Export APK (Android)

### Prérequis

- Android Studio installé
- JDK 17+ installé

### Étapes

```bash
# 1. Construire l'application web
npm run build

# 2. Synchroniser avec Capacitor
npx cap sync android

# 3. Ouvrir dans Android Studio
npx cap open android
```

Dans Android Studio:

1. Menu **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. L'APK sera généré dans `android/app/build/outputs/apk/debug/`

## Export iOS Web (PWA)

Pour une application web accessible sur iOS:

1. **Héberger l'application** sur un serveur (Netlify, Vercel, GitHub Pages, etc.)
2. **Configurer le manifest.json** (déjà fait)
3. **Ajouter à l'écran d'accueil** sur iOS:
   - Ouvrir Safari sur iOS
   - Naviguer vers l'URL de l'application
   - Appuyer sur le bouton de partage
   - Sélectionner "Ajouter à l'écran d'accueil"

## Configuration

Les fichiers de configuration:

- `vite.config.ts` - Configuration Vite
- `capacitor.config.ts` - Configuration Capacitor
- `package.json` - Dépendances et scripts

## Fonctionnalités

- Podcasts d'ostéopathie animale
- Vidéos éducatives
- Parcours d'apprentissage
- Bibliothèque personnelle
- Mode hors ligne (PWA)
