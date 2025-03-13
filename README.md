# Offboarding Application

A frontend web application with mocked backend for managing employee offboarding processes, built with Angular and Node.js.

## Project Structure

```
offboarding/
├── src/                 # Angular frontend source code
├── offboarding-backend/ # Node.js mocked backend
├── public/             # Static assets
└── ...                 # Configuration files
```

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v19)\*\*\*\*

## Getting Started

### Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200`

### Backend Setup

1. Navigate to the backend directory:

```bash
cd offboarding-backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
node index.js
```

The backend API will be available at `http://localhost:3000`

## Features

- Modern Angular 19 frontend with Material Design
- Responsive UI with Tailwind CSS
- State management with NgRx
- Form handling with Angular Forms
- Input masking with ngx-mask
- Node.js backend API

## Code Style

This project uses:

- Prettier for code formatting
- Tailwind CSS for styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat(users):Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
