# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/351cff38-6f4e-43aa-a152-6f11a91c0605

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/351cff38-6f4e-43aa-a152-6f11a91c0605) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/351cff38-6f4e-43aa-a152-6f11a91c0605) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Firebase Setup

If you want to use Firebase (Auth / Firestore / Storage) with this project, follow these steps:

- **Install Firebase SDK**:

```bash
npm install firebase
```

- **Create a Firebase project** in the Firebase Console and copy your web app's config values.

- **Create an env file**: copy `.env.example` to `.env` or `.env.local` in the project root and fill in the values (`VITE_FIREBASE_*`).

- **Use the SDK**: this repo includes a starter initializer at `src/firebase.ts`. Example usage:

```ts
import { auth, db } from './firebase';
// auth -> Firebase Auth instance
// db   -> Firestore instance
```

- **Run the dev server**:

```bash
npm run dev
```

Notes:
- Keep your real API keys and values private (do not commit `.env`).
- Vite only exposes env vars prefixed with `VITE_` to client code.

