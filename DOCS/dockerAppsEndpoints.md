# Backend - API and Swagger docs
curl http://localhost:4040/

# PWA - React app
open http://localhost:3000

# WWW - React website
open http://localhost:3001

# Check MongoDB
docker-compose exec mongodb mongosh -u admin -p password



Useful Commands

# View logs
docker compose logs -f backend
docker compose logs -f pwa
docker compose logs -f www

# Stop all
docker compose down

# Restart specific service
docker compose restart backend

# Execute command in container
docker compose exec backend yarn test


# clear docker files
% docker builder prune -a -f  
docker system prune -a -f --volumes
