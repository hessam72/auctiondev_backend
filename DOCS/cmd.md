# Kill process on port 4040
kill -9 $(lsof -ti:4040)

# Or alternative syntax
lsof -ti:4040 | xargs kill -9

# See what's using port 4040
lsof -i :4040

# For other ports, just replace 4040
kill -9 $(lsof -ti:3000)    # Close port 3000
kill -9 $(lsof -ti:5000)    # Close port 5000


# Start MongoDB service (runs in background)
brew services start mongodb-community

# Stop MongoDB
brew services stop mongodb-community

# Restart MongoDB
brew services restart mongodb-community

# Check if running
brew services list

# View logs
tail -f /usr/local/var/log/mongodb/mongo.log

# Connect to MongoDB CLI
mongosh

# Create a database (inside mongosh)
use auctiondev

# See collections
show collections

# Exit mongosh
exit