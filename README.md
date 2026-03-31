# Shreya Shukla Portfolio

Production-ready personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## Live website

https://shreya-shukla27.github.io/Shreya_Portfolio/

## Live sections

- Hero
- About
- Skills
- Projects
- Experience
- Awards
- Research
- Contact

## Tech stack

- React 19
- Vite 8
- Tailwind CSS 3
- Framer Motion
- Lucide React
- React Icons
- ESLint 9

## Local development

Prerequisites:

- Node.js 20+
- npm 10+

Setup:

1. Install dependencies:

   npm ci

2. Start development server:

   npm run dev

3. Build production bundle:

   npm run build

4. Preview production build:

   npm run preview

5. Run quality checks:

   npm run check

## Environment variables

Create a local env file for contact form integration:

- File: .env.local
- Variable: VITE_FORMSPREE_ENDPOINT

Example:

VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id

Notes:

- .env.local is ignored by Git.
- Use .env.example as a template only.

## Project structure

.
|-- .github/
| `-- workflows/
|       |-- ci.yml
|       `-- deploy-pages.yml
|-- public/
| |-- favicon.svg
| `-- Shreya_Shukla_Resume.pdf
|-- src/
|   |-- assets/
|   |   `-- photo.jpg
| |-- components/
| | |-- layout/
| | | |-- Footer.jsx
| | | `-- Navbar.jsx
|   |   |-- sections/
|   |   |   |-- About.jsx
|   |   |   |-- Achievements.jsx
|   |   |   |-- Contact.jsx
|   |   |   |-- Experience.jsx
|   |   |   |-- Hero.jsx
|   |   |   |-- Projects.jsx
|   |   |   |-- Publications.jsx
|   |   |   `-- TechStack.jsx
| | `-- ui/
|   |       |-- Cursor.jsx
|   |       `-- Loader.jsx
| |-- constants/
| | |-- data.js
| | `-- motion.js
|   |-- hooks/
|   |   `-- index.js
| |-- pages/
| | `-- Home.jsx
|   |-- styles/
|   |   `-- globals.css
| |-- App.jsx
| |-- index.css
| `-- main.jsx
|-- .editorconfig
|-- .env.example
|-- .gitattributes
|-- .gitignore
|-- CONTRIBUTING.md
|-- eslint.config.js
|-- index.html
|-- LICENSE
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- tailwind.config.js
`-- vite.config.js

## Deployment (GitHub Pages)

This repository includes automatic deployment via GitHub Actions.

1. Push to main.
2. In GitHub repository settings, open Pages.
3. Set Source to GitHub Actions.
4. Wait for Deploy GitHub Pages workflow to complete.

Vite base path is auto-handled for GitHub Actions deployments via vite.config.js.

## License

MIT
