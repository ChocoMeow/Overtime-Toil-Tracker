# Overtime-Toil-Tracker

A comprehensive web application for managing employee overtime, leave requests, and TOIL (Time Off In Lieu) tracking. Built with Vue.js frontend and Node.js/Express backend with SQLite database.

## 📺 Screenshot
<img width="1920" height="960" alt="Thumbnail" src="https://github.com/user-attachments/assets/caf9a706-9f2a-4d9e-bb26-e191132efffa" />

## 🚀 Features

### 👥 User Management

-   Employee registration and authentication
-   Role-based access control (Employee, Manager, Admin)
-   User profile management

### 📅 Leave Management

-   Submit and track leave requests
-   Multiple leave types with color coding
-   Leave balance tracking
-   Manager approval workflow

### ⏰ Overtime Tracking

-   Log overtime hours with descriptions
-   Categorize overtime (Regular, Emergency, Weekend, Holiday)
-   Manager approval system
-   Overtime summary and reports

### 🎯 TOIL (Time Off In Lieu) System

-   Earn TOIL from approved overtime
-   Track TOIL balance and expiry dates
-   Use TOIL for time off
-   TOIL usage tracking

### 📊 Reporting & Analytics

-   Dashboard with key metrics
-   Leave and overtime summaries
-   TOIL balance reports
-   Admin approval interface

## 🛠️ Tech Stack

### Frontend

-   **Vue.js 3** - Progressive JavaScript framework
-   **TypeScript** - Type-safe JavaScript
-   **Vite** - Fast build tool and dev server
-   **Pinia** - State management
-   **Vue Router** - Client-side routing
-   **Reka UI** - Modern UI components
-   **Tailwind CSS** - Utility-first CSS framework
-   **Lucide Vue** - Beautiful icons

### Backend

-   **Node.js** - JavaScript runtime
-   **Express.js** - Web application framework
-   **TypeScript** - Type-safe JavaScript
-   **Prisma** - Database ORM
-   **SQLite** - Lightweight database
-   **JWT** - JSON Web Tokens for authentication
-   **bcrypt** - Password hashing

## 🚀 Quick Start

### Prerequisites

-   Node.js (v20 or higher)
-   npm or yarn package manager

### 1. Clone the Repository

```bash
git clone https://github.com/ChocoMeow/Overtime-Toil-Tracker.git
cd Overtime-Toil-Tracker
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up database
npx prisma generate
npx prisma migrate dev

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frondend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

### 4. Access the Application

-   Frontend: http://localhost:5173
-   Backend API: http://localhost:3001
-   Health Check: http://localhost:3001/health

## ⚙️ Environment Configuration

### Backend Environment (`backend/.env`)

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
CORS_ORIGIN="http://localhost:5173"
```

### Frontend Environment (`frondend/.env`)

```env
VITE_API_URL="http://localhost:3001/api"
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
