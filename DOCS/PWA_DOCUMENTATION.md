# AuctionPWA - Progressive Web App Documentation

## Project Overview

**AuctionPWA** is a Progressive Web Application (PWA) built with React that serves as the user interface for the AuctionDev marketplace platform. It's a full-featured web application that can work offline, be installed on devices, and provides a native app-like experience.

**Project Name:** auctionpwa  
**Version:** 1.1.0  
**Type:** Progressive Web App (PWA) / Single Page Application (SPA)  
**License:** sajadweb  
**Main Entry Point:** `index.js`

---

## Technology Stack

### Frontend Framework & Libraries
- **React (16.13.1):** JavaScript library for building user interfaces with component-based architecture
- **React DOM (16.13.1):** React package for rendering components in the DOM
- **React Router DOM (5.2.0):** Client-side routing for SPA navigation
- **React Scripts (3.4.1):** Create React App scripts and configuration

### UI Components & Design
- **Ant Design (4.3.4):** Enterprise-grade React component library
  - Tables, forms, modals, buttons, layouts, etc.
- **Ant Design Jalali Moment (3.3.8):** Persian calendar support for Ant Design date pickers
- **Moment.js (2.27.0):** Date and time manipulation library
- **Moment Jalaali (0.9.2):** Persian calendar support (Jalali calendar)
- **React Modern Calendar Datepicker (3.1.6):** Modern date picker component
- **React Swipeable Views (0.14.0-alpha.0):** Touch-friendly swiping functionality

### Rich Text & Content Editing
- **Braft Editor (2.3.9):** Rich text editor component for content creation
- **React Quill (1.3.5):** Quill editor integration for React

### Data Handling & State Management
- **Axios (0.19.2):** HTTP client for API requests
- **Lodash (4.17.19):** Utility library for data manipulation

### Build & Development Tools
- **Craco (5.6.4):** Create React App configuration override tool
- **Craco Less (1.17.0):** LESS support for CSS preprocessing
- **React Scripts:** Create React App build tooling

### Utilities & Helpers
- **Array Move (3.0.1):** Utility for moving array elements
- **React Sortable HOC (1.11.0):** React higher-order component for sortable lists
- **React Swipeable Views (0.14.0-alpha.0):** Swipe gesture support

### Testing
- **React Testing Library (9.3.2):** Testing React components
- **@Testing Library/Jest-DOM (4.2.4):** Jest matchers for DOM elements
- **@Testing Library/User-Event (7.1.2):** User interaction simulation for tests
- **ESLint Plugin Flowtype (5.1.3):** Flow type checking

---

## Project Structure

```
pwa/
├── src/                      # Source code directory
│   ├── pages/                # Page/screen components
│   │   ├── 403/              # Access forbidden page
│   │   ├── 404/              # Not found page
│   │   ├── 500/              # Server error page
│   │   ├── account/          # User account management
│   │   ├── auth/             # Authentication pages (login, signup)
│   │   ├── category/         # Category browsing/management
│   │   ├── location/         # Location selection/management
│   │   ├── main/             # Main/dashboard page
│   │   ├── message/          # Messaging/chat interface
│   │   ├── notify/           # Notifications page
│   │   ├── panel/            # Main panel/layout wrapper
│   │   ├── plan/             # Subscription/plan pages
│   │   ├── product/          # Product pages (list, detail, create)
│   │   ├── setting/          # Settings pages
│   │   ├── transactions/     # Transaction history
│   │   └── user/             # User profile and management
│   ├── components/           # Reusable components
│   │   ├── Icons/            # Icon components
│   │   ├── delete/           # Delete confirmation component
│   │   ├── footer/           # Footer component
│   │   ├── form/             # Form components
│   │   ├── header/           # Header/navigation component
│   │   ├── modal/            # Modal dialog components
│   │   ├── persian/          # Persian/Farsi language utilities
│   │   ├── role/             # Role-based components
│   │   ├── sider/            # Sidebar component
│   │   ├── status/           # Status display components
│   │   ├── table/            # Table display components
│   │   └── tooles/           # Utility/tool components
│   ├── routers/              # Route configuration
│   │   └── index.js          # Route definitions
│   ├── api/                  # API integration
│   │   └── auth.js           # Authentication API calls
│   ├── comman/               # Common/shared utilities
│   ├── App.js                # Main App component
│   ├── App.test.js           # App component tests
│   ├── index.js              # Application entry point
│   ├── serviceWorker.js      # PWA service worker
│   ├── setupTests.js         # Test configuration
│   └── logo.svg              # Application logo
├── public/                   # Static assets
│   ├── index.html            # HTML entry point
│   ├── manifest.json         # PWA manifest file
│   ├── robots.txt            # SEO robots file
│   ├── worker.js             # Service worker registration
│   ├── assets/               # Asset files
│   └── images/               # Image assets and icons
├── craco.config.js           # Craco configuration (LESS, aliases)
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile                # Docker container configuration
├── package.json              # Dependencies and scripts
└── docker/                   # Docker build files
    └── Dockerfile
```

---

## Core Features

### 1. **Authentication & Authorization**
- User login/registration
- JWT token management
- Protected routes (role-based access)
- Session persistence
- Account management

### 2. **Product Management**
- Browse products with filtering
- Search products by name, category, location
- View detailed product information
- Upload product photos
- Create/edit product listings
- Product categorization and tagging

### 3. **User Account**
- User profile management
- Account settings
- User preferences
- Profile picture/avatar upload
- Account security settings

### 4. **Marketplace Features**
- Product browsing
- Category navigation
- Location-based filtering
- Product search
- Price filtering

### 5. **Transactions & Payments**
- View transaction history
- Payment status tracking
- Invoice management
- Transaction details

### 6. **Notifications & Messaging**
- Real-time notifications
- Messaging/chat interface
- Notification preferences
- Message history

### 7. **Subscription Plans**
- View available plans
- Plan comparison
- Subscription management
- Plan upgrades/downgrades

### 8. **Settings & Preferences**
- Language settings
- Theme customization
- Privacy settings
- Notification preferences

### 9. **Admin Panel**
- Dashboard with analytics
- User management
- Product moderation
- Transaction monitoring
- Settings management

### 10. **Progressive Web App Features**
- Offline functionality
- App installation on devices
- Responsive design
- Push notifications
- Service worker caching

---

## Component Architecture

### Page Components (`pages/`)

Each page typically includes:
- Page container layout
- Form components for data input
- Table components for data display
- Modal dialogs for confirmations/actions
- Status indicators
- Error handling and validation

**Key Pages:**
- **panel/** - Main layout wrapper with header, sidebar, footer
- **auth/** - Login and registration pages
- **product/** - Product listing, details, and creation
- **account/** - User account management
- **message/** - User messaging/chat
- **transactions/** - Payment and transaction history
- **setting/** - Application and user settings

### Reusable Components (`components/`)

**Header Component** (`header/`)
- Navigation bar
- Logo/branding
- User menu
- Search functionality

**Sidebar Component** (`sider/`)
- Navigation menu
- Category links
- User profile link
- Settings link

**Footer Component** (`footer/`)
- Company information
- Links
- Social media
- Copyright

**Form Components** (`form/`)
- Input fields
- Dropdowns/selects
- File uploads
- Form validation
- Submit buttons

**Table Components** (`table/`)
- Data tables
- Pagination
- Sorting
- Column customization
- Row actions

**Modal Components** (`modal/`)
- Dialog boxes
- Confirmation dialogs
- Information modals
- Form modals

**Persian Components** (`persian/`)
- Persian language support
- RTL layout support
- Jalali calendar integration
- Persian number formatting

**Status Components** (`status/`)
- Status badges
- Loading indicators
- Success/error messages
- Icons

**Utility Components** (`tooles/`)
- Helpers
- Formatters
- Validators
- Common utilities

---

## API Integration

### Axios Configuration (`api/auth.js`)
- API base URL configuration
- Request/response interceptors
- Authentication token management
- Error handling
- API endpoints for:
  - User authentication
  - Product CRUD
  - User profile
  - Transactions
  - Notifications
  - Messages

### API Call Examples
```javascript
// Login
POST /api/auth/login

// Get products
GET /api/products

// Create product
POST /api/products

// Get user profile
GET /api/users/profile

// Get transactions
GET /api/transactions
```

---

## Progressive Web App Features

### Service Worker (`serviceWorker.js`)
- Offline functionality
- Cache strategy (Cache First, Network First, Stale While Revalidate)
- Background sync
- Push notification handling
- Asset precaching

### Manifest File (`public/manifest.json`)
- App name and branding
- App icons (multiple sizes: 72x72 to 512x512)
- Theme colors
- Display mode (fullscreen)
- App start URL
- Scope (/)

### PWA Capabilities
- **Installability:** Install as app on home screen
- **Offline Support:** Works without internet
- **Native Feel:** Full-screen mode, custom icons
- **Responsive Design:** Works on all devices
- **Push Notifications:** Receive browser notifications
- **App Shortcuts:** Quick access to features

---

## Build & Development

### Available Scripts

```bash
# Development
yarn start              # Start development server (https://localhost:3000)

# Production Build
yarn build              # Create optimized production build

# Testing
yarn test              # Run tests in watch mode

# Docker
yarn docker:up         # Build and start Docker container
yarn docker:down       # Stop and remove Docker container

# Advanced
yarn eject             # Eject from Create React App (irreversible)
```

### Development Server
- **Port:** 3000 (default)
- **Protocol:** HTTP/HTTPS with hot reload
- **Auto-reload:** Changes refresh immediately
- **Error Overlay:** Compilation errors displayed in browser

---

## Styling & Theme

### CSS Framework
- **Ant Design Theme:** Default theme colors and components
- **LESS Support:** Via Craco LESS plugin
- **Custom Theming:** Theme color customization (#2196f3 - Material Blue)

### Theme Colors
- **Primary:** #2196F3 (Blue)
- **Background:** #2196F3 (Blue)
- **Display Mode:** Fullscreen

### Responsive Design
- Mobile-first approach
- Tailored for all screen sizes (72px to 512px+ width)
- Touch-friendly interfaces
- Swipeable components for mobile

---

## Testing Strategy

### Testing Framework
- **Jest:** Test runner (via React Scripts)
- **React Testing Library:** Component testing
- **Enzyme/RTL:** DOM testing utilities

### Test Coverage
- Unit tests for components (`App.test.js`)
- Integration tests for pages
- API mocking for backend calls
- User interaction simulation

### Running Tests
```bash
yarn test                 # Run all tests
yarn test --coverage     # Generate coverage report
```

---

## Internationalization (i18n)

### Persian Language Support
- **Ant Design Jalali Moment:** Persian calendar in date pickers
- **Moment Jalaali:** Jalali/Persian calendar conversion
- **RTL Layout:** Right-to-left text direction
- **Persian Numbers:** Number formatting support
- **Language Toggle:** Switch between languages

---

## Docker Deployment

### Docker Configuration
- **Image Name:** auctionpwa
- **Base Image:** Node.js (from Dockerfile)
- **Port:** 3000 (development), 80/443 (production)
- **Build Process:** Multi-stage build for optimization

### Docker Commands
```bash
# Development with Docker
yarn docker:up          # Build and run container

# Stop Docker
yarn docker:down        # Stop and remove container
```

### Docker Compose Services
- Development server
- Volume mounting for live reload
- Port mapping and networking

---

## Browser Support

### Production Browsers
- Chrome/Chromium >0.2% market share
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Excluded Browsers
- Dead browsers
- Opera Mini (op_mini)

---

## Build Output

### Production Bundle
- Minified JavaScript
- Optimized CSS
- Source maps for debugging
- Asset optimization
- Service worker precache manifest

### Build Directory Structure
```
build/
├── index.html
├── static/
│   ├── js/
│   ├── css/
│   └── media/
├── manifest.json
├── robots.txt
├── favicon.ico
└── service-worker.js
```

---

## Performance Optimization

### Build Optimization
- Code splitting via React Router
- Lazy loading of components
- Image optimization
- CSS minification
- JavaScript bundling and minification

### Runtime Optimization
- Service worker caching
- Efficient component re-renders (React.memo, useMemo)
- Optimized API calls
- Swipeable views for better UX

---

## State Management Pattern

### Local State
- React hooks (useState, useContext)
- Component-level state management

### API State
- Axios for HTTP requests
- Response caching
- Error handling middleware

### Authentication State
- JWT token storage (localStorage/sessionStorage)
- Protected routes with role-based access

---

## Security Features

1. **Authentication:** JWT token-based auth
2. **HTTPS:** Encrypted communication (in production)
3. **CORS:** Cross-origin request protection
4. **XSS Protection:** React's built-in HTML escaping
5. **CSRF Prevention:** Token validation on requests
6. **Input Validation:** Form validation before submission

---

## Development Workflow

### Setup
```bash
# Clone repository
git clone <repo>

# Navigate to PWA directory
cd pwa

# Install dependencies
yarn install

# Create .env file with API configuration
cp .env.example .env

# Start development server
yarn start
```

### Development Loop
1. Start dev server: `yarn start`
2. Edit components in `src/`
3. Save - automatic reload
4. Test changes: `yarn test`
5. Build for production: `yarn build`
6. Deploy to server

### Code Quality
- ESLint configuration (React App preset)
- prettier formatting
- Commit hooks (via Husky in main project)

---

## Environment Configuration

### Required Environment Variables
```
REACT_APP_API_URL      # Backend API base URL
REACT_APP_API_PORT     # Backend API port
REACT_APP_ENV          # Environment (development/production)
```

### JWT Token Management
- Store token in localStorage/sessionStorage
- Include token in Authorization header
- Handle token expiration and refresh
- Logout on unauthorized (401) responses

---

## Deployment

### Development Deployment
```bash
yarn docker:up        # Local Docker deployment
```

### Production Deployment
```bash
yarn build              # Create production build
# Upload dist/ folder to server
# Serve with web server (Nginx, Apache, etc.)
```

### Web Server Configuration
- Enable gzip compression
- Set cache headers for static assets
- Configure service worker caching headers
- Enable HTTPS/SSL

---

## Features by User Type

### Regular Users
- Browse and search products
- Create product listings
- Manage account and profile
- View and manage transactions
- Receive notifications
- Message other users
- Subscribe to plans

### Admin/Seller
- Full product management
- Advanced analytics dashboard
- User management interface
- Transaction monitoring
- Settings access
- Moderation capabilities

### Guests
- Browse public products
- View categories
- Limited product information
- Prompt to login/register

---

## Future Enhancement Possibilities

1. **Real-time Features**
   - WebSocket integration for live messaging
   - Real-time notifications

2. **Payment Integration**
   - Integrated payment gateway
   - Multiple payment methods

3. **Advanced Analytics**
   - User behavior tracking
   - Sales analytics dashboard

4. **Mobile App**
   - React Native implementation
   - App store deployment

5. **AI Features**
   - Product recommendations
   - Smart search
   - Fraud detection

---

## Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# macOS/Linux
kill -9 $(lsof -ti:3000)

# Or use different port
PORT=3001 yarn start
```

**Node modules issues:**
```bash
rm -rf node_modules yarn.lock
yarn install
```

**Build failures:**
```bash
yarn cache clean
yarn install
yarn build
```

---

## Support & Maintenance

- **Issues:** Report bugs via repository
- **Testing:** Write tests for new features
- **Code Review:** Peer review before merge
- **Performance:** Monitor bundle size
- **Dependencies:** Keep packages updated

---

## Related Projects

- **Backend API:** [AuctionDev Backend](../backend/PROJECT_DOCUMENTATION.md)
- **Marketplace Backend:** `../backend/`
- **Admin Dashboard:** `../www/`

---

## License

Custom License: sajadweb

