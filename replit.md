# Overview

EarthChain is a blockchain-focused web application that presents itself as "The Global Blockchain Platform." It's built as a modern single-page application with an interactive Earth visualization and comprehensive information about blockchain technology, decentralized finance (DeFi), and Web3 development. The application serves as both an educational platform and a showcase for blockchain innovation, featuring sections on features, ecosystem statistics, learning resources, developer tools, and community engagement.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React with TypeScript, leveraging a modern component-based architecture. The application uses Vite as the build tool and development server, providing fast hot-reload capabilities. The UI is constructed with shadcn/ui components built on top of Radix UI primitives, styled with Tailwind CSS for consistent design. The application implements a single-page architecture using Wouter for client-side routing.

Key architectural decisions include:
- **Component Library**: Uses shadcn/ui for consistent, accessible UI components
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Internationalization**: Custom language provider supporting multiple languages
- **Theme System**: Custom theme provider supporting light/dark modes
- **Interactive Graphics**: Custom Canvas-based Earth visualization component

## Backend Architecture
The backend follows a minimalist Express.js architecture with TypeScript. The server is designed to serve the React application and provide API endpoints with a modular route structure. The application uses an abstracted storage interface pattern that currently implements in-memory storage but can be easily extended to use database persistence.

Key architectural decisions include:
- **Framework**: Express.js with TypeScript for type safety
- **Storage Abstraction**: Interface-based storage layer (IStorage) for flexibility
- **Development Integration**: Seamless Vite integration for development workflow
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Built-in request/response logging for API routes

## Data Storage Solutions
The application currently uses a dual storage approach:
- **Development Storage**: In-memory storage implementation for rapid development
- **Production Ready**: Database schema defined with Drizzle ORM for PostgreSQL
- **Schema Management**: Shared schema definitions between client and server
- **Type Safety**: Full TypeScript integration with Drizzle for database operations

The database schema includes user management with username/password authentication, designed to be easily extensible for additional entities.

## Authentication and Authorization
The authentication system is designed around a simple user model with username/password credentials. The architecture supports:
- **User Registration**: Create new users with unique usernames
- **User Lookup**: Retrieve users by ID or username
- **Session Management**: Cookie-based sessions with express-session integration
- **Type Safety**: Zod schema validation for user input

## External Dependencies
The application integrates several key external services and libraries:

**UI and Styling**:
- Radix UI for accessible component primitives
- Tailwind CSS for utility-first styling
- Lucide React for consistent iconography

**Development Tools**:
- Vite for fast development and building
- ESBuild for server-side bundling
- TypeScript for type safety across the stack

**Database Integration**:
- Drizzle ORM for type-safe database operations
- PostgreSQL as the target database (via @neondatabase/serverless)
- Drizzle Kit for schema migrations

**State Management**:
- TanStack Query for server state management
- React Hook Form with resolvers for form handling

**Deployment**:
- Replit-specific plugins for development environment integration
- Production build optimization for static asset serving