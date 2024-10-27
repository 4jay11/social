# Use a base image with Node.js
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend /app/backend

# Copy frontend files (ensure the build is created first)
COPY frontend/build /app/frontend/build

# Install backend dependencies
RUN cd /app/backend && npm install

# Expose port
EXPOSE 8000

# Start the backend server
CMD ["node", "backend/server.js"]