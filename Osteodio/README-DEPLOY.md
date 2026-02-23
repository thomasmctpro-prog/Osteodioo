# Guide de déploiement Osteodio

## 📁 Emplacement du projet

Le dossier complet se trouve ici:

```
C:\Users\thoma\Documents\Nouveau dossier\Osteodio
```

---

## 📱 OPTION 1: APK Android (Android Studio)

### Étape 1: Préparer les dépendances

1. Ouvrez un terminal (PowerShell ou CMD)
2. Exécutez:

```bash
cd "C:\Users\thoma\Documents\Nouveau dossier\Osteodio"
npm install
```

### Étape 2: Builder le projet web

```bash
npm run build
```

### Étape 3: Synchroniser Capacitor

```bash
npx cap sync android
```

### Étape 4: Ouvrir dans Android Studio

```bash
npx cap open android
```

### Étape 5: Générer l'APK

Dans Android Studio:

- Menu **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
- L'APK sera dans: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🌐 OPTION 2: GitHub Pages (iOS Web)

### Étape 1: Créer un repository GitHub

1. Allez sur https://github.com
2. Cliquez **New repository**
3. Nommez-le: `osteodio`
4. Choisissez **Public**
5. Cliquez **Create repository**

### Étape 2: Uploader les fichiers

Cliquez sur **"uploading an existing file"** et uploadz:

- Tous les dossiers/sauf `node_modules` et `android`
- Tous les fichiers (package.json, vite.config.ts, etc.)
- Le dossier `dist` (après avoir fait `npm run build`)

### Étape 3: Activer GitHub Pages

1. Allez dans **Settings** → **Pages** (à gauche)
2. Sous **Build and deployment**:
   - Source: Changez et choisissez **GitHub Actions** (au lieu de "Deploy from a branch")
3. C'est tout ! GitHub va s'occuper de compiler le projet en lisant notre fichier `.github/workflows/deploy.yml`.

### Étape 4: Utiliser sur iOS

1. Attendez 2-3 minutes pour le déploiement
2. Allez sur: `https://VOTRE-NOM.github.io/osteodio`
3. Sur iPhone: Safari → Bouton Partager → "Ajouter à l'écran d'accueil"

---

## 💡 Alternative plus rapide (sans npm install)

Pour GitHub Pages uniquement, vous pouvez uploader seulement le dossier `dist`:

1. Créez un repo GitHub
2. Uploadez le contenu du dossier `dist` à la racine
3. Settings → Pages → Deploy from branch → main/(root)
4. C'est tout!
