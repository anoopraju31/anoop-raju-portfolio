# 🧑‍💻 Anoop Raju - Developer Portfolio

This is the **personal portfolio website** of [Anoop Raju](https://anoopraju.xyz), built to showcase projects, skills, experience, and contact details. It serves as a dynamic, responsive, and fast web application built using modern frontend technologies.

> 🔗 **Live Website**: [anoopraju.xyz](https://anoopraju.xyz)  
> 📁 **Source Code**: [GitHub Repository](https://github.com/anoopraju31/anoop-raju-portfolio)

---

## 📌 Features

- 🚀 **Fully Responsive** — Works on all screen sizes
- 🎨 **Modern UI** — Clean and minimalist design
- 🛠️ **Built with React + Tailwind CSS**
- 🌙 **Dark Mode Support**
- 📂 **Project Showcase** — Includes live demos and GitHub links
- 🧠 **Skills & Experience** — Highlights tech stack and education
- 📞 **Contact Section** — Contact form with mail integration via Sanity CMS

---

## 🛠️ Tech Stack

| Category      | Tools & Libraries                                                                                               |
|---------------|-----------------------------------------------------------------------------------------------------------------|
| Frontend      | [React.js](https://reactjs.org/), [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/) |
| Styling       | [Tailwind CSS](https://tailwindcss.com/)                                                                        |
| CMS / Backend | [Sanity.io](https://www.sanity.io/)                                                                             |
| Deployment    | [Vercel](https://vercel.com/)                                                                                   |
| Icons         | [React Icons](https://react-icons.github.io/react-icons/)                                                       |

---

## 📁 Folder Structure
``` bash
anoop-raju-portfolio/
├── public/                # Static assets (images, favicon, etc.)
├── src/
│ ├── app/                 # Next.js App Router files
│ ├── components/          # Reusable UI components
│ ├── sanity/              # Sanity client and query logic
│ └── utils/               # Utility functions and helpers
├── .env.example           # Environment variable template
├── .env.local             # Local environment variables (not committed)
├── .eslintrc.json         # ESLint config
├── .gitignore             # Git ignored files
├── .README.md             # Project documentation (likely backup)
├── next.config.js         # Next.js configuration
├── package-lock.json      # Dependency lock file
├── package.json           # Project metadata and scripts
├── postcss.config.js      # PostCSS configuration for Tailwind
├── sanity.cli.ts          # CLI config for Sanity
├── sanity.config.ts       # Main Sanity configuration
├── sanity.types.ts        # TypeScript types for Sanity schemas
├── schema.json            # Sanity schema JSON
├── tailwind.config.ts     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
└── types.ts               # Global custom TypeScript types
```

---

## 📁 Folder Structure


---

## ⚙️ Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io (for content management)
- **Icons**: Lucide Icons
- **Deployment**: Vercel

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/anoopraju31/anoop-raju-portfolio.git
cd anoop-raju-portfolio
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables
Create a .env file by copying the example:
```bash
cp .env.example .env
```
Edit .env with your Sanity project credentials:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
NEXT_PUBLIC_SANITY_API_KEY=your_sanity_api_key
```

### 4. Start the development server
``` bash
npm run dev
# or
yarn dev
```
Open http://localhost:3000 to view the app.

---

## 📦 Deployment

This project is deployed on **Vercel**. To deploy:

1. Push your code to GitHub  
2. Import the repository on [Vercel](https://vercel.com/import)  
3. Add the environment variables in the Vercel dashboard  
4. Deploy 🚀

---

## 📄 License

Licensed under the [**MIT License**](https://mit-license.org/).

