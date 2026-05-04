# AuctionDev Website (www) - Public Portal Documentation

## Project Overview

**AuctionDev Website (www)** is a public-facing React web application that serves as the landing page, informational portal, and public website for the AuctionDev marketplace platform. It provides general information about the platform, terms of service, help resources, contact information, and payment transaction result pages.

**Project Name:** auctionpwa (public website variant)  
**Version:** 1.1.0  
**Type:** React Single Page Application (SPA)  
**License:** sajadweb  
**Main Entry Point:** `index.js`

---

## Technology Stack

### Frontend Framework & Libraries
- **React (16.13.1):** JavaScript library for building user interfaces
- **React DOM (16.13.1):** React rendering engine
- **React Router DOM (5.2.0):** Client-side routing for SPA navigation
- **React Scripts (3.4.1):** Create React App build tooling

### UI Components & Design
- **Ant Design (4.3.4):** Enterprise-grade UI component library
- **Ant Design Jalali Moment (3.3.8):** Persian calendar support
- **Moment.js (2.27.0):** Date and time utilities
- **Moment Jalaali (0.9.2):** Persian/Jalali calendar support
- **React Modern Calendar Datepicker (3.1.6):** Date picker component
- **React Swipeable Views (0.14.0-alpha.0):** Touch swipe functionality

### Rich Text & Content
- **Braft Editor (2.3.9):** Rich text editor
- **React Quill (1.3.5):** WYSIWYG editor component

### Data & State
- **Axios (0.19.2):** HTTP client for API requests
- **Lodash (4.17.19):** Utility functions for data manipulation

### Build & Development
- **Craco (5.6.4):** Create React App configuration override
- **Craco Less (1.17.0):** LESS preprocessor support

### Utilities
- **Array Move (3.0.1):** Array element manipulation
- **React Sortable HOC (1.11.0):** Drag-and-drop sorting
- **React Swipeable Views:** Mobile swipe gestures

### Testing
- **React Testing Library (9.3.2):** Component testing
- **@Testing Library/Jest-DOM (4.2.4):** DOM testing matchers
- **@Testing Library/User-Event (7.1.2):** User interaction simulation
- **ESLint Plugin Flowtype (5.1.3):** Type checking

---

## Project Structure

```
www/
├── src/                         # Source code
│   ├── pages/                   # Page/screen components
│   │   ├── 403/                 # Access forbidden error page
│   │   ├── 404/                 # Not found error page
│   │   ├── 500/                 # Server error page
│   │   ├── home/                # Landing/home page
│   │   ├── about/               # About us page
│   │   ├── rule/                # Terms & conditions/rules page
│   │   ├── contacts/            # Contact us page
│   │   ├── helptopics/          # FAQ/help topics page
│   │   ├── services/            # Services/features page
│   │   └── transaction/         # Payment transaction result pages
│   │       ├── success/         # Payment success confirmation
│   │       ├── waiting/         # Payment pending/processing
│   │       └── failure/         # Payment failed/error
│   │
│   ├── components/              # Reusable components
│   │   ├── Icons/               # Icon components
│   │   ├── Layout/              # Main layout wrapper
│   │   ├── header/              # Header/navigation bar
│   │   ├── footer/              # Footer component
│   │   ├── sider/               # Sidebar navigation
│   │   ├── modal/               # Modal dialog components
│   │   ├── form/                # Form input components
│   │   ├── delete/              # Delete confirmation
│   │   ├── status/              # Status display components
│   │   ├── persian/             # Persian/Farsi utilities
│   │   ├── role/                # Role-based rendering
│   │   └── tooles/              # Utility helper components
│   │
│   ├── routers/                 # Route configuration
│   │   └── index.js             # Route definitions
│   │
│   ├── api/                     # API integration
│   │   └── auth.js              # API call utilities
│   │
│   ├── common/                  # Shared utilities
│   │   ├── history.js           # Router history management
│   │   ├── css/                 # Global styles
│   │   │   └── color.less       # Theme colors
│   │   ├── extensions.js        # Custom extensions
│   │   └── ConfigProvider.js    # Theme/config provider
│   │
│   ├── index.js                 # Application entry point
│   ├── serviceWorker.js         # PWA service worker
│   ├── setupTests.js            # Test configuration
│   └── logo.svg                 # Logo asset
│
├── public/                      # Static assets
│   ├── index.html               # HTML template
│   ├── manifest.json            # PWA metadata
│   ├── robots.txt               # SEO robots file
│   ├── worker.js                # Service worker registration
│   ├── assets/                  # Static assets
│   └── images/                  # Image assets and icons
│
├── craco.config.js              # Craco configuration
├── docker-compose.yml           # Docker Compose setup
├── Dockerfile                   # Docker image definition
├── docker/                      # Docker configuration
│   └── Dockerfile
├── package.json                 # Dependencies and scripts
└── README.md                    # Project readme
```

---

## Core Features

### 1. **Landing Page**
- Hero section with value proposition
- Platform features showcase
- Call-to-action buttons (Sign up, Login)
- Quick start guide
- Statistics/metrics display
- Latest transactions/activity
- Platform benefits overview

### 2. **About Us Page**
- Company information
- Mission and vision statement
- Team member profiles
- Company history/timeline
- Core values
- Achievements and milestones

### 3. **Terms & Rules Page**
- Terms of Service
- User Agreement
- Platform Rules and Policies
- Code of Conduct
- Dispute Resolution Process
- User Rights and Responsibilities
- Platform Policies

### 4. **Contact Us Page**
- Contact form
- Address and location information
- Phone and email contacts
- Social media links
- Support channels
- Office hours/availability
- Map integration

### 5. **Help Topics / FAQ**
- Frequently Asked Questions
- Getting Started Guide
- How to Buy/Sell
- Payment Methods
- Shipping Information
- Return Policies
- Troubleshooting Guide
- Video tutorials (if applicable)

### 6. **Services Page**
- Platform services overview
- Feature descriptions
- Service categories
- Premium features
- APIs and integrations
- Service tiers/plans

### 7. **Payment Transaction Pages**
- **Success Page:** Payment confirmation and order details
- **Waiting Page:** Payment processing/pending status
- **Failure Page:** Payment error information and retry options

---

## Page Components Details

### Home Page (`pages/home/`)
**Purpose:** Landing page for new visitors

**Typical Sections:**
- Hero banner with tagline
- Featured products/listings
- Recent transactions
- Platform statistics
- Testimonials/reviews
- Key features highlight
- Blog posts (optional)
- Newsletter signup

**Components Used:**
- Header with navigation
- Hero section
- Feature cards
- Product carousel
- Testimonial slider
- CTA buttons
- Footer

### About Page (`pages/about/`)
**Purpose:** Inform visitors about the company

**Typical Content:**
- Company story
- Mission/vision statements
- Core values
- Team members
- Timeline of achievements
- Partnerships
- Corporate social responsibility

### Rules Page (`pages/rule/`)
**Purpose:** Legal terms and conditions

**Typical Sections:**
- Terms of Service
- User Agreement
- Acceptable Use Policy
- Liability Disclaimer
- Modification Rights
- Termination Policy
- Dispute Resolution

### Contacts Page (`pages/contacts/`)
**Purpose:** Enable user communication

**Features:**
- Contact form (name, email, subject, message)
- Contact information (email, phone)
- Office location with map
- Business hours
- Support department info
- Social media links

### Help Topics Page (`pages/helptopics/`)
**Purpose:** Self-service support and FAQs

**Typical Structure:**
- Accordion-style FAQ sections
- Search functionality
- Category filtering
- Related articles
- Video tutorials
- Knowledge base
- Support ticket option

### Services Page (`pages/services/`)
**Purpose:** Showcase platform capabilities

**Content:**
- Service descriptions
- Feature list
- Service tiers/pricing (if applicable)
- Integration options
- Use cases
- Success stories

### Transaction Pages (`pages/transaction/`)

**Success Page:**
- Green confirmation message
- Transaction ID
- Order summary
- Item details
- Amount paid
- Seller information
- Delivery details
- Next steps (tracking, etc.)
- Email confirmation notice

**Waiting Page:**
- Processing status message
- Yellow/amber status indicator
- Transaction reference number
- Expected completion time
- Pending actions (if any)
- Refresh option
- Support contact info

**Failure Page:**
- Error message and reason
- Transaction details
- Error code
- Retry button
- Alternative payment methods
- Support contact information
- Account/order information

---

## Component Architecture

### Layout Component (`components/Layout/`)
- Main page wrapper
- Header wrapper
- Sidebar wrapper
- Footer wrapper
- Theme configuration
- Responsive breakpoints

### Header Component (`components/header/`)
**Features:**
- Navigation menu (Home, About, Services, Help, Contact)
- Logo/branding
- Login/Signup buttons
- Mobile hamburger menu
- Search bar (optional)
- Language selector
- Sticky header on scroll

### Footer Component (`components/footer/`)
**Content:**
- Copyright notice
- Quick links
- Company information
- Social media icons
- Newsletter signup
- Contact information
- Legal links (Privacy, Terms)
- Sitemap

### Modal Components (`components/modal/`)
- Confirmation dialogs
- Information modals
- Newsletter signup modal
- Contact modal (mobile)
- Login prompt modal

### Form Components (`components/form/`)
- Text input fields
- Email field
- Message textarea
- Submit buttons
- Form validation
- Error messages
- Success messages

### Persian Components (`components/persian/`)
- RTL (Right-to-Left) layout support
- Jalali date picker
- Persian number formatting
- Persian text display
- Language toggle

### Status Components (`components/status/`)
- Success badge (green)
- Error badge (red)
- Pending badge (yellow)
- Info badge (blue)
- Loading spinner
- Message states

---

## Routing Structure

### Public Routes (No Authentication Required)

```
/                    → Home page
/about              → About us page
/services           → Services page
/rule               → Terms and rules page
/contacts           → Contact us page
/helptopics         → Help topics/FAQ page
/transaction/success → Payment success confirmation
/transaction/waiting → Payment processing status
/transaction/failure → Payment failed page
/403                → Access forbidden page
/404                → Page not found page
/500                → Server error page
```

**Default Behavior:**
- All routes are publicly accessible
- No login required
- Users can navigate freely
- Unauthenticated visitors directed to home

---

## API Integration

### Axios Configuration (`api/auth.js`)

**Endpoints Called:**
```javascript
// Contact form submission
POST /api/contact          // Submit contact form

// FAQ/Help topics
GET /api/helptopics        // Fetch help topics

// Service information
GET /api/services          // Fetch services list

// Transaction status
GET /api/transactions/:id  // Check transaction status

// Company information
GET /api/company/info      // Get company details
```

### Contact Form API
```javascript
POST /api/contact
Body: {
  name: string,
  email: string,
  subject: string,
  message: string,
  phone?: string
}
Response: {
  success: boolean,
  message: string,
  ticketNumber?: string
}
```

---

## Styling & Theme

### Color Scheme
- **Primary Color:** #2196F3 (Material Blue)
- **Background:** #FFFFFF (White)
- **Text:** #333333 (Dark Gray)
- **Success:** #4CAF50 (Green)
- **Error:** #F44336 (Red)
- **Warning:** #FFC107 (Amber)

### CSS Architecture
- **LESS Preprocessing:** Via Craco LESS plugin
- **Ant Design Theme:** Built-in customization
- **Custom Styles:** `src/common/css/color.less`
- **Responsive Design:** Mobile-first approach

### Responsive Breakpoints
```javascript
xs: 480px    // Mobile phones
sm: 576px    // Small devices
md: 768px    // Tablets
lg: 992px    // Large screens
xl: 1200px   // Desktop
xxl: 1600px  // Wide desktop
```

---

## Build & Development

### Available Scripts

```bash
# Development
yarn start              # Start development server on http://localhost:3000

# Production
yarn build              # Create optimized production build

# Testing
yarn test              # Run tests in watch mode

# Docker
yarn docker:up         # Build and start Docker container
yarn docker:down       # Stop Docker container

# Advanced
yarn eject             # Eject from Create React App configuration
```

### Development Server
- **Port:** 3000
- **Protocol:** HTTP with hot reload
- **Auto-save:** Changes automatically refresh
- **Error Display:** Compilation errors shown in browser

---

## Internationalization (i18n)

### Persian Language Features
- **Ant Design Jalali Moment:** Persian calendar in date pickers
- **Moment Jalaali:** Jalali/Gregorian calendar conversion
- **RTL Support:** Right-to-left text layout
- **Persian Numbers:** Number formatting in Persian
- **Language Files:** Translation strings

### Language Switching
- Language selector in header
- Persist language preference (localStorage)
- Auto-detect browser language
- Fallback to English/Persian

---

## SEO Optimization

### Meta Tags
- Dynamic page titles per route
- Meta descriptions
- Open Graph tags for social sharing
- Twitter cards
- Canonical URLs

### Structure
- Semantic HTML markup
- Proper heading hierarchy (H1, H2, H3)
- Image alt text
- Schema.org structured data
- Robots.txt for crawling

### Performance
- Lazy loading for images
- Code splitting per route
- CSS minification
- JavaScript bundling
- Gzip compression

---

## Accessibility

### Features
- ARIA labels for screen readers
- Keyboard navigation support
- Color contrast compliance
- Focus indicators
- Semantic HTML elements
- Alt text for images

### Standards
- WCAG 2.1 Level AA compliance target
- Ant Design accessibility features
- React best practices
- Mobile accessibility

---

## Docker Deployment

### Docker Configuration

**Dockerfile:**
- Base image: Node.js runtime
- Build stage: Create optimized build
- Runtime stage: Serve static files
- Port: 3000 (development), 80/443 (production)

### Docker Commands
```bash
# Build and run
yarn docker:up

# Stop and remove container
yarn docker:down
```

### Docker Compose Services
- Web service (port 3000 exposed)
- Volume mounting for live reload
- Network configuration
- Environment variables setup

---

## Performance Optimization

### Build Optimization
- Code splitting with React Router
- Lazy loading of page components
- Image optimization
- CSS/JS minification
- Asset optimization

### Runtime Optimization
- Component memoization
- Efficient re-renders
- API response caching
- Service worker caching

### Bundle Analysis
```bash
# Analyze bundle size
npm install --save-dev source-map-explorer
yarn build
npx source-map-explorer 'build/static/js/*.js'
```

---

## Testing Strategy

### Testing Framework
- **Jest:** Test runner
- **React Testing Library:** Component testing
- **React App ESLint:** Code quality

### Test Types
- **Unit Tests:** Component isolation
- **Integration Tests:** Component interactions
- **End-to-End:** Full user flows (optional)

### Running Tests
```bash
yarn test                    # Run all tests
yarn test --coverage        # Generate coverage report
yarn test --watch           # Watch mode
```

---

## Static Site Generation (Optional Enhancement)

### Benefits
- Faster page load times
- SEO improvement
- Reduced server load
- Better caching strategies
- Offline capability

### Tools (for future implementation)
- Gatsby.js
- Next.js Static Export
- React Static

---

## Browser Support

### Production Targets
- Chrome/Chromium (>0.2% market share)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Excluded
- Dead browsers
- Opera Mini
- Internet Explorer

---

## Environment Variables

### Configuration
```
REACT_APP_API_URL       # Backend API base URL
REACT_APP_API_PORT      # Backend API port
REACT_APP_ENV           # Environment (dev/prod)
REACT_APP_SITE_NAME     # Website name
REACT_APP_SITE_URL      # Website URL
```

### .env.example
```
REACT_APP_API_URL=http://localhost:4040
REACT_APP_API_PORT=4040
REACT_APP_ENV=development
REACT_APP_SITE_NAME=AuctionDev
```

---

## State Management

### State Strategy
- **Component State:** React hooks (useState, useContext)
- **API State:** Axios interceptors and response caching
- **Global State:** Context API or Redux (if needed)

### Data Flow
```
User Input → Component State → API Call → Backend
Backend Response → State Update → UI Re-render
```

---

## Security Features

### HTTPS & Encryption
- SSL/TLS in production
- Secure cookies
- HSTS headers

### Input Validation
- Client-side validation
- Form sanitization
- XSS prevention (React built-in)

### CORS
- Cross-origin request protection
- Allowed origin configuration
- Credentials handling

### Security Headers
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection

---

## Development Workflow

### Setup Instructions
```bash
# 1. Clone repository
git clone <repo>

# 2. Navigate to www directory
cd www

# 3. Install dependencies
yarn install

# 4. Create environment file
cp .env.example .env

# 5. Edit .env with your configuration
nano .env

# 6. Start development server
yarn start

# 7. Open browser
# http://localhost:3000
```

### Development Loop
1. Start dev server: `yarn start`
2. Edit components in `src/`
3. Save file - auto-reload
4. Review changes
5. Test features: `yarn test`
6. Build for production: `yarn build`

### Git Workflow
- Create feature branches
- Make meaningful commits
- Create pull requests
- Code review process
- Merge to main

---

## Deployment

### Development Environment
```bash
# Local development
yarn start

# Docker local deployment
yarn docker:up
```

### Production Environment
```bash
# Build for production
yarn build

# Output directory: build/

# Deploy to server:
1. Copy build/ to web server
2. Configure web server (Nginx/Apache)
3. Set up HTTPS/SSL
4. Configure domain DNS
5. Enable caching headers
```

### Web Server Configuration (Nginx Example)
```nginx
server {
  listen 80;
  server_name your-domain.com;
  
  location / {
    root /var/www/auction-www;
    try_files $uri /index.html;
  }
  
  # Cache static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

---

## Analytics & Monitoring

### Google Analytics Integration
- Track page views
- User behavior
- Conversion tracking
- Goal measurement

### Error Monitoring
- Sentry for error tracking
- Error logging
- Performance monitoring
- User session recording

### Metrics to Track
- Page load time
- Time to interactive
- Bounce rate
- Conversion rate
- User engagement

---

## Content Management

### Static Content
- Edit pages directly in code
- Content lives in component files
- Version control via Git

### Dynamic Content (Future Enhancement)
- Headless CMS integration (Strapi, Contentful)
- Admin panel for content editing
- Dynamic content loading from API

---

## Accessibility Compliance

### WCAG 2.1 Level A Compliance
- Keyboard navigation
- Color contrast ratios
- Screen reader compatibility
- Focus management
- Semantic HTML

### Testing Tools
- axe DevTools browser extension
- WAVE accessibility browser extension
- Lighthouse audit
- Manual testing

---

## Performance Metrics

### Web Vitals (Lighthouse)
- **Largest Contentful Paint (LCP):** < 2.5s
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1
- **Time to First Byte (TTFB):** < 600ms

### Bundle Size
- JavaScript: < 200KB
- CSS: < 50KB
- Images: < 100KB
- Total: < 350KB

---

## Related Projects

- **Backend API:** [AuctionDev Backend](../backend/PROJECT_DOCUMENTATION.md)
- **PWA Application:** [AuctionPWA](../PWA_DOCUMENTATION.md)

---

## Future Enhancement Ideas

1. **blog/** - Blog section with articles
2. **news/** - News and updates page
3. **pricing/** - Pricing/subscription plans page
4. **testimonials/** - Customer success stories
5. **careers/** - Jobs and careers page
6. **privacy/** - Privacy policy page
7. **search/** - Site-wide search functionality
8. **events/** - Events and webinars page

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

**Build failures:**
```bash
# Clear cache
rm -rf node_modules build
yarn cache clean
yarn install
yarn build
```

**API connection errors:**
- Check backend is running
- Verify API URL in .env
- Check CORS configuration
- Review network tab in DevTools

---

## Support & Maintenance

- **Reporting Issues:** GitHub issues
- **Code Standards:** ESLint configuration
- **Testing:** Jest/RTL tests
- **Dependencies:** Keep packages updated
- **Documentation:** Keep README updated

---

## License

Custom License: sajadweb

