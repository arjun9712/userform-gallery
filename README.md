# Welcome to your Lovable project
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

  Local Development Setup for Submission Management App
Prerequisites
Node.js (preferably the latest LTS version) & npm installed
Git installed
A code editor (VS Code recommended)
Getting Started
Clone the repository

git clone <YOUR_REPOSITORY_URL>
cd <REPOSITORY_FOLDER_NAME>
Install dependencies

npm install
Start the development server

npm run dev
This will start the application on http://localhost:8080. The app features hot-reloading, so any changes you make to the code will automatically refresh the browser.

Project Structure
src/ - Main source code directory
components/ - Reusable UI components
submissions/ - Components related to user submissions
admin/ - Admin interface components
ui/ - Shadcn UI components
lib/ - Utility functions and stores
hooks/ - Custom React hooks
pages/ - Main page components
Key Features
Form submission management
Submission viewing, editing, and deletion
Search and filter functionality
Responsive design for all device sizes
Making Changes
Create a new branch for your changes

git checkout -b feature/your-feature-name
Make your changes
Commit your changes

git add .
git commit -m "Description of your changes"
Push to your branch

git push origin feature/your-feature-name
Create a pull request on the repository website
Data Management
The application uses Zustand for state management. Submission data is stored in the browser's local storage for persistence between sessions.

Deployment
For deployment, use:


npm run build
This creates a production-ready build in the dist/ directory, which can be deployed to any static hosting service.

Troubleshooting
If you encounter module errors, try clearing node_modules and reinstalling:


rm -rf node_modules
npm install
For Vite-related issues, check the Vite configuration in vite.config.ts

Adding New Components
Follow the existing project structure patterns:

Create new components in appropriate folders
Use TypeScript for type safety
Style with Tailwind CSS
Use shadcn/ui components where applicable
Updating Dependencies
Periodically update dependencies for security and new features:


npm update
For major version updates, check the changelog of each package for breaking changes before updating.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
