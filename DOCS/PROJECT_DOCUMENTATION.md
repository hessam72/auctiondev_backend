# AuctionDev Backend Project Documentation

## Project Overview

**AuctionDev** is a RESTful API backend application built with Node.js and Express. The project appears to be an auction/marketplace platform that facilitates buying, selling, and managing products with various features such as user authentication, product management, transactions, notifications, and photo uploads.

**Author:** Sajjad Mohammadi nejad  
**Version:** 1.0.0  
**License:** MIT  
**Main Entry Point:** `index.js`

---

## Technology Stack

### Core Framework & Runtime
- **Node.js:** JavaScript runtime (v8.10.0+)
- **Express.js (4.16.3):** HTTP server framework for building REST APIs
- **Nodemon (2.0.4):** Development tool for auto-restarting server on file changes

### Database
- **MongoDB:** NoSQL database for data storage
- **Mongoose (5.7.5):** Object Data Modeling (ODM) library for MongoDB
- **Bluebird (3.5.1):** Promise library for async operations

### Authentication & Security
- **JWT (jsonwebtoken 7.1.9):** JSON Web Tokens for stateless authentication
- **Express-JWT (5.3.1):** JWT middleware for Express
- **Bcrypt (5.0.0):** Password hashing and encryption
- **Helmet (3.22.0):** Security headers middleware
- **CORS (2.8.4):** Cross-Origin Resource Sharing support
- **Body-Parser (1.18.2):** Middleware for parsing request bodies
- **Cookie-Parser (1.4.3):** Cookie parsing middleware

### Validation & API
- **Express-Validation (1.0.2):** Request validation middleware
- **Joi (10.6.0):** Schema validation library
- **Swagger UI Express (4.1.3):** Interactive API documentation
- **Morgan (1.10.0):** HTTP request logger middleware
- **Express-Winston (2.5.0):** Winston logging middleware for Express

### Utilities
- **Lodash (4.17.15):** Utility library for functional programming
- **Moment (2.26.0):** Date/time manipulation library
- **Multer (1.4.2):** File upload middleware
- **Request (2.88.2):** HTTP client library
- **FS-Extra (9.0.1):** File system operations
- **Method-Override (2.3.10):** HTTP method override middleware
- **Compression (1.7.2):** Response compression middleware
- **Debug (2.4.5):** Debugging utility
- **Dotenv (4.0.0):** Environment variable management
- **HTTP-Status (1.0.1):** HTTP status code constants
- **YamlJS (0.3.0):** YAML parsing library

### External Services
- **Kavenegar (1.1.4):** SMS gateway integration (for OTP/notifications)
- **@Slack/Webhook (5.0.3):** Slack notifications integration
- **Push Notifications:** Custom push notification helper

### Development & Testing
- **Mocha (7.2.0):** Testing framework
- **Chai (4.1.2):** Assertion library
- **Supertest (3.0.0):** HTTP assertion library
- **Istanbul (1.1.0-alpha.1):** Code coverage tool
- **ESLint (4.18.2):** Code linting with Airbnb configuration
- **ESLint-Watch (6.0.1):** Watch mode for linting
- **Cross-Env (5.1.4):** Cross-platform environment variables
- **Coveralls (3.0.0):** Coverage reporting
- **Husky (0.14.3):** Git hooks
- **Validate-Commit-Msg (2.14.0):** Commit message validation
- **Commitizen (4.1.2):** Commit template tool

### Logging
- **Winston (2.4.1):** Logging library
- **Winston-Transport (4.4.0):** Winston transport plugins

---

## Project Structure

```
backend/
├── server/              # Main application source code
│   ├── auth/            # Authentication module
│   ├── category/        # Product categories
│   ├── favorite/        # User favorites/wishlist
│   ├── location/        # Location management
│   ├── notify/          # Notification system
│   ├── photo/           # Photo/image management
│   ├── plan/            # Subscription/plan management
│   ├── product/         # Product management
│   ├── setting/         # Application settings
│   ├── support/         # Support/ticket system
│   ├── tag/             # Product tags
│   ├── transaction/     # Transaction/payment records
│   ├── user/            # User management
│   ├── helpers/         # Utility helpers
│   └── tests/           # Test files
├── config/              # Configuration files
│   ├── config.js        # Centralized configuration
│   ├── express.js       # Express setup
│   ├── authorize.js     # Authorization rules
│   ├── Extension.js     # Custom extensions
│   ├── param-validation.js
│   ├── winston.js       # Logging configuration
│   └── slack.winston.js # Slack logging setup
├── public/              # Static files and uploads
│   ├── uploads/
│   │   ├── icons/       # Icon uploads
│   │   └── product/     # Product image uploads
│   └── service-worker.js # PWA service worker
├── docker/              # Docker configurations
│   ├── dev/             # Development Docker setup
│   └── prod/            # Production Docker setup
├── swagger/             # API documentation
│   ├── swagger.json
│   └── swagger.yaml
├── index.js             # Application entry point
├── index.route.js       # Main routes
├── package.json         # Dependencies and scripts
└── docker-compose.yml   # Docker composition files
```

---

## Core Features

### 1. **Authentication & Authorization**
- User registration and login with JWT tokens
- Role-based access control (RBAC)
- Password encryption with bcrypt
- Session management

### 2. **User Management**
- User profile management
- User roles and status
- User activity tracking

### 3. **Product Management**
- Product CRUD operations
- Product categorization
- Product tagging system
- Photo/image uploads for products
- Product inventory management

### 4. **Marketplace Features**
- Favorite products (wishlist)
- Product filtering and search
- Location-based products

### 5. **Transaction & Payment**
- Transaction tracking
- Payment integration (NextPay)
- Payment status management
- Transaction history

### 6. **Notification System**
- SMS notifications (via Kavenegar)
- Push notifications
- Email notifications
- Slack notifications for admin/support

### 7. **Support System**
- Support ticket creation and management
- Customer support handling

### 8. **Settings & Configuration**
- Application-wide settings
- User preferences

### 9. **API Documentation**
- Interactive Swagger UI
- RESTful API endpoints
- API versioning ready

---

## Environment Variables

The application uses environment variables (via `.env` file) for configuration:

```
NODE_ENV          # Environment (development/production/test/provision)
PORT              # Server port (default: 4040)

# Payment Configuration
PAY_TEMPLATE
NEXTPAY_CALLBACK_URI
NEXTPAY_API_KEY
NEXTPAY_URI
NEXTPAY_VERIFY_URI

# Notification Configuration
NOTIFY_APPKEY
NOTIFY_UTL
NOTIFY_APIKEY

# SMS Configuration
SMS_KEY
CLINT_CALLBACK_URI
SMS_TEMPLATE

# Database
MONGOOSE_DEBUG
MONGO_HOST
MONGO_PORT

# Security
JWT_SECRET
```

---

## Available Scripts

### Development
```bash
yarn start              # Start server with auto-reload (nodemon)
yarn start:debug       # Start with debug logging enabled
```

### Testing
```bash
yarn test              # Run test suite
yarn test:watch       # Run tests on file changes
yarn test:coverage    # Run tests with code coverage report
yarn test:check-coverage  # Verify coverage thresholds
```

### Code Quality
```bash
yarn lint             # Run ESLint
yarn lint:watch       # Run ESLint on file changes
```

### Docker
```bash
yarn docker:up        # Build and start Docker containers
yarn docker:down      # Stop and remove Docker containers
```

---

## API Endpoints Structure

The API follows RESTful conventions with the following module organization:

- `/api/auth/` - Authentication endpoints
- `/api/users/` - User management
- `/api/products/` - Product CRUD
- `/api/categories/` - Product categories
- `/api/favorites/` - User favorites
- `/api/locations/` - Location services
- `/api/photos/` - Photo management
- `/api/transactions/` - Transaction records
- `/api/notifications/` - Notification settings
- `/api/support/` - Support tickets
- `/api/tags/` - Product tags
- `/api/settings/` - Application settings

Full API documentation available at: `http://localhost:4040/`

---

## Database

The application uses **MongoDB** as its primary data store with Mongoose ODM for schema definition and validation.

**Connection URI:** Configured via `MONGO_HOST` environment variable  
**Default Port:** 27017  
**Features:**
- Automatic schema validation
- Middleware hooks
- Virtual properties
- Query population

---

## Error Handling

The application includes custom error handling:
- **APIError:** Custom error class for API-specific errors
- **HTTP Status Codes:** Proper HTTP status responses
- **Error Middleware:** Centralized error handling

---

## Security Features

1. **Helmet:** Security headers protection
2. **CORS:** Cross-origin request control
3. **JWT:** Stateless authentication
4. **Bcrypt:** Password hashing
5. **Input Validation:** Request validation with Joi
6. **Rate Limiting:** Can be configured
7. **HTTPS:** SSL/TLS support ready

---

## Logging & Monitoring

- **Winston:** Structured logging
- **Morgan:** HTTP request logging
- **Slack Integration:** Real-time notifications to Slack
- **Debug Module:** Detailed debugging capabilities
- **Coverage Reports:** Code coverage analysis

---

## Deployment

### Production Build
```bash
yarn build                    # Compile to ES5
scp -rp dist/ user@server:/path   # Upload to server
yarn --production             # Install production dependencies
pm2 start dist/index.js       # Start with PM2
```

### Docker Deployment
```bash
docker-compose -f docker-compose-prod.yml up -d
```

---

## Development Workflow

1. **Clone & Install:**
   ```bash
   git clone <repo>
   yarn install
   ```

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start Development Server:**
   ```bash
   yarn start
   ```

4. **Run Tests:**
   ```bash
   yarn test
   yarn test:coverage
   ```

5. **Check Code Quality:**
   ```bash
   yarn lint
   ```

---

## Architecture Highlights

- **MVC Pattern:** Controllers, routes, models separated
- **RESTful API:** Standard REST conventions
- **Async/Await:** Modern JavaScript async patterns
- **Middleware Stack:** Organized middleware chain
- **Error Handling:** Centralized error management
- **Validation:** Request/response validation
- **Testing:** Comprehensive test coverage
- **Code Quality:** ESLint enforcement
- **Scalability:** Docker containerization ready

---

## Next Steps for Development

1. Set up MongoDB instance
2. Configure environment variables
3. Install dependencies: `yarn install`
4. Start development server: `yarn start`
5. View API docs: `http://localhost:4040/`
6. Run tests to verify setup: `yarn test`

---

## Support & Maintenance

- **Issues:** Report bugs through the repository
- **Testing:** Write tests for new features
- **Coverage:** Maintain 80%+ code coverage
- **Linting:** Follow Airbnb ESLint rules
- **Commits:** Use conventional commits format

---

## License

MIT License - See [LICENSE](./backend/LICENSE) file for details

