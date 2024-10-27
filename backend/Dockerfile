# Use a base image with Node.js
FROM node:20

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend/package*.json ./backend/

COPY backend/ ./backend/

# Install backend dependencies
RUN cd backend && npm install


# Expose port
EXPOSE 8000

# Start the backend server
CMD ["node", "backend/server.js"]
