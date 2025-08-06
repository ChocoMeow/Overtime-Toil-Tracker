# Overtime & TOIL Tracker - Frontend

A modern Vue 3 frontend application for tracking overtime, Time Off In Lieu (TOIL), and annual leave. Built with Vue 3, Vite, TypeScript, and Shadcn Vue UI framework.

## Features

### ✅ Implemented

-   **Authentication System**: Login and registration with JWT tokens
-   **Dashboard**: Overview with stats cards and recent activity
-   **Leave Management**: Request leave, view leave requests, and balances
-   **Overtime Tracking**: Log overtime hours and view entries
-   **TOIL Management**: Track TOIL balances and expiring entries
-   **Reports**: Analytics and export functionality
-   **User Profile**: View and manage profile information
-   **Settings**: Application settings (placeholder)

### 🎨 UI/UX Features

-   **Responsive Design**: Mobile-first approach with Tailwind CSS
-   **Modern UI**: Shadcn Vue components with consistent design
-   **Dark Mode Ready**: CSS variables for easy theming
-   **Accessibility**: WCAG compliant components
-   **Icons**: Lucide Vue Next icons throughout the application

## Technology Stack

-   **Framework**: Vue 3 with Composition API
-   **Build Tool**: Vite
-   **Language**: TypeScript
-   **UI Framework**: Shadcn Vue
-   **Styling**: Tailwind CSS v4
-   **State Management**: Pinia
-   **Routing**: Vue Router v4
-   **Icons**: Lucide Vue Next
-   **HTTP Client**: Fetch API with custom wrapper

## Project Structure

```
src/
├── api/              # API client and endpoints
├── components/       # Vue components
│   ├── ui/          # Shadcn Vue UI components
│   ├── layout/      # Layout components
│   └── forms/       # Form components
├── stores/          # Pinia stores
│   ├── auth.ts      # Authentication store
│   ├── leave.ts     # Leave management store
│   ├── overtime.ts  # Overtime tracking store
│   └── toil.ts      # TOIL management store
├── types/           # TypeScript type definitions
├── views/           # Page components
├── router.ts        # Vue Router configuration
└── main.ts          # Application entry point
```

## Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Key Components

### Stores (Pinia)

#### Auth Store

-   User authentication state
-   Login/logout functionality
-   Token management
-   User profile data

#### Leave Store

-   Leave request management
-   Leave balance tracking
-   Request status updates

#### Overtime Store

-   Overtime entry management
-   Hours calculation
-   Status tracking

#### TOIL Store

-   TOIL balance tracking
-   Expiry date management
-   Usage tracking

### Views

#### Dashboard

-   Overview statistics
-   Quick actions
-   Recent activity feed

#### Leave Management

-   Leave request list
-   Request creation form
-   Balance display
-   Status filtering

#### Overtime Management

-   Overtime entries list
-   Hours logging form
-   Monthly statistics
-   Status tracking

#### TOIL Management

-   TOIL balance overview
-   Expiring entries alerts
-   Usage tracking

#### Reports

-   Analytics dashboard
-   Export functionality
-   Period filtering

## API Integration

The frontend is designed to work with a RESTful API backend. The API client (`src/api/client.ts`) handles:

-   Authentication endpoints
-   Leave management endpoints
-   Overtime tracking endpoints
-   TOIL management endpoints
-   Reports endpoints

## Styling

The application uses Tailwind CSS v4 with Shadcn Vue components for a consistent and modern design. Key styling features:

-   CSS variables for theming
-   Responsive design patterns
-   Consistent spacing and typography
-   Accessible color contrasts

## Development

### Adding New Components

1. Use Shadcn Vue CLI for UI components:

```bash
npx shadcn-vue@latest add [component-name]
```

2. Create custom components in `src/components/`

### State Management

Use Pinia stores for global state management. Each feature has its own store:

-   `useAuthStore()` - Authentication
-   `useLeaveStore()` - Leave management
-   `useOvertimeStore()` - Overtime tracking
-   `useTOILStore()` - TOIL management

### Routing

Add new routes in `src/router.ts`. Routes are protected by authentication guards.

## Future Enhancements

-   [ ] Real-time notifications
-   [ ] Advanced analytics and charts
-   [ ] Mobile app (PWA)
-   [ ] Calendar integration
-   [ ] Email notifications
-   [ ] Bulk operations
-   [ ] Advanced filtering and search
-   [ ] Export to PDF/Excel
-   [ ] Multi-language support

## Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Follow Vue 3 Composition API patterns
4. Use Shadcn Vue components for consistency
5. Write meaningful commit messages

## License

This project is part of the Overtime & TOIL Tracker application.
