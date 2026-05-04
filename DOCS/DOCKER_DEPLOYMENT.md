# AuctionDev - Complete Docker Deployment Guide

## Current Docker Status

✅ **YES** - All three projects (Backend, PWA, WWW) are already configured with Docker!

Each project has:
- ✅ Dockerfile 
- ✅ docker-compose.yml
- ✅ Environment setup

---

## Table of Contents

1. [Current Individual Setup](#current-individual-setup)
2. [Run Projects Individually](#run-projects-individually)
3. [Unified Docker Setup (Run All Together)](#unified-docker-setup)
4. [Complete Docker Commands](#complete-docker-commands)
5. [Troubleshooting](#troubleshooting)

---

## Current Individual Setup

### Backend Configuration

**File:** `backend/docker-compose.yml`

```yaml
version: "3"
services:
  auctiondev:        # Node API Server
    container_name: auctiondev
    ports:
      - "3003:3003"
    environment:
      - NODE_ENV=development
      - PORT=3003
  
  nginxdev:          # Nginx Reverse Proxy
  auctiondbdev:      # MongoDB
```

**Details:**
- **Image:** Node.js latest
- **Port:** 3003 (container) → 3003 (host)
- **Port:** 80 (Nginx)
- **Database:** MongoDB in container (auctiondbdev)
- **Volumes:** Live code reload support

---

### PWA Configuration

**File:** `pwa/docker-compose.yml`

```yaml
version: '3'
services:
  auctionpwa:        # React Development Server
    container_name: auctionpwa
    ports:
      - 70:7700      # Note: Port mapping seems incorrect (should be 3000:3000)
    environment:
      - CHOKIDAR_USEPOLLING=true
```

**Details:**
- **Image:** Node.js
- **Port:** Currently 70:7700 (needs fix - should be 3000:3000)
- **Volumes:** Live reload enabled
- **Port Expected:** 3000

---

### WWW Configuration

**File:** `www/docker-compose.yml`

```yaml
version: '3'
services:
  auctionpwa:        # React Web Server (same name as PWA - conflict!)
    container_name: auctionpwa
    ports:
      - 70:7700      # Note: Port mapping seems incorrect (should be 3001:3000)
    environment:
      - CHOKIDAR_USEPOLLING=true
```

**Details:**
- **Image:** Node.js
- **Port:** Currently 70:7700 (needs fix - should be 3001:3000)
- **Volumes:** Live reload enabled
- **Port Expected:** 3000

---

## Run Projects Individually

### Run Backend Only

```bash
cd backend
yarn docker:up       # Builds and starts backend + nginx + mongodb
```

**Access:**
- API: `http://localhost:3003/` or `http://localhost/` (via Nginx)
- Swagger Docs: `http://localhost:3003/` 

**Stop:**
```bash
cd backend
yarn docker:down
```

---

### Run PWA Only

```bash
cd pwa
yarn docker:up       # Builds and starts React dev server
```

**Note:** Port mapping is wrong in current setup. 

**Access (with current config):**
- PWA: `http://localhost:70/` (but might not work correctly)

**Stop:**
```bash
cd pwa
yarn docker:down
```

---

### Run WWW Only

```bash
cd www
yarn docker:up       # Builds and starts React web server
```

**Note:** Port mapping is wrong and conflicts with PWA.

**Access (with current config):**
- WWW: `http://localhost:70/` (conflicts with PWA, won't work)

**Stop:**
```bash
cd www
yarn docker:down
```

---

## Unified Docker Setup

To run all three services together with proper configuration, follow these steps:

### Step 1: Create Root docker-compose.yml

Create a new file in the project root `/Users/hesam/Documents/GitHub/nodejs-karimi-app/docker-compose.yml`:

```yaml
version: '3.8'

networks:
  auctiondev-network:
    driver: bridge

services:
  # ============ MONGODB ============
  mongodb:
    image: mongo:5.0
    container_name: auctiondev-mongodb
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongodb_data:/data/db
    networks:
      - auctiondev-network
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 5s
      retries: 5

  # ============ BACKEND API ============
  backend:
    build:
      context: ./backend
      dockerfile: ./docker/dev/Dockerfile
    container_name: auctiondev-backend
    restart: always
    ports:
      - "4040:4040"
    environment:
      - NODE_ENV=development
      - PORT=4040
      - MONGO_HOST=mongodb://mongodb:27017/auctiondev
      - JWT_SECRET=your_secret_key_here
      - SMS_KEY=your_sms_key
      - NOTIFY_APPKEY=your_notify_app_key
      - NOTIFY_UTL=your_notify_url
      - NOTIFY_APIKEY=your_notify_api_key
      - CLINT_CALLBACK_URI=http://localhost:3000
    volumes:
      - ./backend:/usr/src/app
      - /usr/src/app/node_modules
    depends_on:
      mongodb:
        condition: service_healthy
    networks:
      - auctiondev-network
    command: npm start

  # ============ PWA (Marketplace App) ============
  pwa:
    build:
      context: ./pwa
      dockerfile: ./docker/Dockerfile
    container_name: auctiondev-pwa
    restart: always
    ports:
      - "3000:3000"
    environment:
      - CHOKIDAR_USEPOLLING=true
      - REACT_APP_API_URL=http://localhost:4040/api
      - REACT_APP_API_PORT=4040
      - REACT_APP_ENV=development
    volumes:
      - ./pwa:/app
      - /app/node_modules
    depends_on:
      - backend
    networks:
      - auctiondev-network
    command: yarn start

  # ============ WWW (Public Website) ============
  www:
    build:
      context: ./www
      dockerfile: ./docker/Dockerfile
    container_name: auctiondev-www
    restart: always
    ports:
      - "3001:3000"
    environment:
      - CHOKIDAR_USEPOLLING=true
      - REACT_APP_API_URL=http://localhost:4040/api
      - REACT_APP_API_PORT=4040
      - REACT_APP_ENV=development
    volumes:
      - ./www:/app
      - /app/node_modules
    depends_on:
      - backend
    networks:
      - auctiondev-network
    command: yarn start

  # ============ NGINX REVERSE PROXY (Optional) ============
  nginx:
    image: nginx:latest
    container_name: auctiondev-nginx
    restart: always
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - backend
      - pwa
      - www
    networks:
      - auctiondev-network

volumes:
  mongodb_data:
    driver: local
```

### Step 2: Create Nginx Configuration

Create `nginx.conf` in project root:

```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 20M;

    # Backend API
    upstream backend {
        server backend:4040;
    }

    # PWA (Marketplace)
    upstream pwa {
        server pwa:3000;
    }

    # WWW (Public Website)
    upstream www {
        server www:3000;
    }

    # API Server
    server {
        listen 80;
        server_name api.localhost;

        location / {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    # Marketplace App
    server {
        listen 80;
        server_name app.localhost localhost;

        location / {
            proxy_pass http://pwa;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }

    # Public Website
    server {
        listen 80;
        server_name www.localhost;

        location / {
            proxy_pass http://www;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

### Step 3: Update .env Files

**backend/.env:**
```env
NODE_ENV=development
PORT=4040
MONGO_HOST=mongodb://mongodb:27017/auctiondev
JWT_SECRET=your_secret_key_here
SMS_KEY=your_sms_key
NOTIFY_APPKEY=your_notify_app_key
NOTIFY_UTL=your_notify_url
NOTIFY_APIKEY=your_notify_api_key
CLINT_CALLBACK_URI=http://localhost:3000
```

**pwa/.env:**
```env
REACT_APP_API_URL=http://localhost:4040/api
REACT_APP_API_PORT=4040
REACT_APP_ENV=development
```

**www/.env:**
```env
REACT_APP_API_URL=http://localhost:4040/api
REACT_APP_API_PORT=4040
REACT_APP_ENV=development
```

---

## Complete Docker Commands

### Run All Services Together

```bash
# From project root directory
cd /Users/hesam/Documents/GitHub/nodejs-karimi-app

# Build all images and start all services
docker-compose up -d --build

# Or with live logs
docker-compose up --build
```

### Check Status

```bash
# View running containers
docker-compose ps

# View logs of specific service
docker-compose logs backend
docker-compose logs pwa
docker-compose logs www
docker-compose logs mongodb

# Follow logs (live)
docker-compose logs -f backend
```

### Stop All Services

```bash
# Stop all containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop, remove containers, and delete volumes
docker-compose down -v
```

### Restart Services

```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart backend
docker-compose restart pwa
```

### Run Single Service

```bash
# Start only backend
docker-compose up backend mongodb -d

# Start only PWA
docker-compose up pwa backend mongodb -d

# Start only WWW
docker-compose up www backend mongodb -d
```

### Build Without Starting

```bash
# Build all images
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build pwa
```

### Clean Up

```bash
# Remove dangling images
docker image prune -f

# Remove dangling volumes
docker volume prune -f

# Remove everything unused
docker system prune -a -f
```

---

## Access Applications

### Direct Access (Without Nginx)

| Service | URL | Description |
|---------|-----|-------------|
| Backend API | `http://localhost:4040` | REST API & Swagger docs |
| PWA App | `http://localhost:3000` | Marketplace application |
| WWW Site | `http://localhost:3001` | Public website |
| MongoDB | `localhost:27017` | Database (not web accessible) |

### With Nginx Reverse Proxy

| Service | Domain | URL |
|---------|--------|-----|
| Backend API | api.localhost | `http://api.localhost/` |
| PWA App | app.localhost | `http://app.localhost/` |
| WWW Site | www.localhost | `http://www.localhost/` |

**To use domain names locally, add to `/etc/hosts`:**
```
127.0.0.1 api.localhost
127.0.0.1 app.localhost
127.0.0.1 www.localhost
```

---

## Service Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Internet/Host                           │
└────┬──────────────────────────────────────────────────────┬──┘
     │ :4040                          :3000         :3001    │
     │                                                        │
┌────▼─────────────────────────────────────────────────────▼──┐
│                    Docker Network: auctiondev-network       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Backend    │  │     PWA      │  │     WWW      │      │
│  │  :4040       │  │    :3000     │  │    :3000     │      │
│  │  Node.js     │  │   React      │  │   React      │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                 │              │
│  ┌──────▼──────────────────┼─────────────────┘──┐          │
│  │      MongoDB            │                    │          │
│  │      :27017             │                    │          │
│  │                         │                    │          │
│  └─────────────────────────┴────────────────────┘          │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Nginx (Optional)                        │  │
│  │         Reverse Proxy & Load Balancer               │  │
│  │                   :80                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Development Workflow with Docker

### Adding New Dependencies

```bash
# Backend
docker-compose exec backend yarn add package-name

# PWA
docker-compose exec pwa yarn add package-name

# WWW
docker-compose exec www yarn add package-name
```

### Running Commands Inside Container

```bash
# Execute arbitrary command
docker-compose exec backend yarn test

# Interactive shell
docker-compose exec backend /bin/bash
```

### View Container Logs

```bash
# All logs
docker-compose logs

# Specific service
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 backend
```

---

## Production Deployment

### Environment Variables for Production

**docker-compose.prod.yml:**

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:5.0
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    volumes:
      - /data/mongodb:/data/db
    restart: always

  backend:
    build:
      context: ./backend
      dockerfile: ./docker/prod/Dockerfile
    environment:
      - NODE_ENV=production
      - MONGO_HOST=mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongodb:27017/auctiondev
    restart: always
    # ... other config

  pwa:
    build:
      context: ./pwa
      dockerfile: ./docker/Dockerfile
    environment:
      - NODE_ENV=production
    restart: always

  www:
    build:
      context: ./www
      dockerfile: ./docker/Dockerfile
    environment:
      - NODE_ENV=production
    restart: always
```

**Run Production:**
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs service-name

# Example
docker-compose logs backend

# View more detailed error
docker-compose up backend --no-daemon
```

### Port Already in Use

```bash
# Find process on port
lsof -i :4040

# Kill process
kill -9 <PID>

# Or use different port in docker-compose.yml
ports:
  - "4041:4040"  # Host:Container
```

### MongoDB Connection Errors

```bash
# Check MongoDB is running
docker-compose ps mongodb

# Connect to MongoDB
docker-compose exec mongodb mongosh -u admin -p password

# Check connection from backend logs
docker-compose logs backend | grep mongo
```

### React App Not Hot Reloading

```bash
# Ensure CHOKIDAR_USEPOLLING is set to true
# Check docker-compose.yml has:
environment:
  - CHOKIDAR_USEPOLLING=true
```

### No Such File or Directory Errors

```bash
# Rebuild without cache
docker-compose build --no-cache

# Remove volumes and rebuild
docker-compose down -v
docker-compose up -d --build
```

### Network Issues Between Services

```bash
# Verify services can reach each other
docker-compose exec backend ping pwa
docker-compose exec pwa ping backend

# Check DNS resolution
docker-compose exec backend nslookup mongodb
```

---

## Docker Compose vs Individual Dockerfile

### Individual Setup (Current)
✅ Easy to develop one service at a time
❌ Manual coordination between services
❌ Setup complexity for full stack

### Docker Compose Setup (Recommended)
✅ One command to start all services
✅ Automatic networking between containers
✅ Environment variable management
✅ Volume persistence
✅ Service dependency handling
✅ Production-ready

---

## Performance Tips

### Optimize Build Time

```bash
# Use BuildKit for faster builds
export DOCKER_BUILDKIT=1
docker-compose build --no-cache
```

### Reduce Image Size

- Use lightweight base images (node:16-alpine)
- Remove unnecessary dependencies
- Use multi-stage builds

### Monitor Resource Usage

```bash
# View container stats
docker stats

# Use compose with resource limits
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

---

## Next Steps

1. **Create docker-compose.yml** in project root (from section "Create Root docker-compose.yml")
2. **Create nginx.conf** (from section "Create Nginx Configuration")
3. **Update all .env files** with Docker MongoDB connection string
4. **Run all services:**
   ```bash
   docker-compose up -d --build
   ```
5. **Access applications:**
   - Backend: `http://localhost:4040`
   - PWA: `http://localhost:3000`
   - WWW: `http://localhost:3001`

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [MongoDB Docker Documentation](https://hub.docker.com/_/mongo)

---

## Support

If you encounter issues:

1. Check Docker is running: `docker ps`
2. View logs: `docker-compose logs service-name`
3. Rebuild images: `docker-compose down -v && docker-compose up -d --build`
4. Check Docker disk space: `docker system df`

