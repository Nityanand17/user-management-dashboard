# User Management Dashboard

A simple admin dashboard built with React, TypeScript, and Tailwind CSS to manage users.

## Features

- View users with search functionality
- Add new users via a multi-step form
- Form validation with error messages
- Dark mode support
- Responsive design
- Data persistence with localStorage

## Tech Stack

- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Framer Motion for animations
- React Context API for state management
- Sonner for toast notifications

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Nityanand17/user-management-dashboard.git
cd user-management-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Deployment

### Deploying to Vercel

1. Fork or clone this repository to your GitHub account
2. Create a new project on Vercel
3. Connect your GitHub repository to Vercel
4. Deploy with default settings (Vercel will automatically detect the Vite configuration)

### Manual Deployment

1. Build the project
```bash
npm run build
```

2. The build output will be in the `dist` directory, which can be deployed to any static hosting service

## Project Structure

- `src/components`: UI components
- `src/context`: React Context providers
- `src/pages`: Main page components
- `src/types`: TypeScript type definitions

## License

MIT 
