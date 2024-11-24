# Dockerfile
FROM node:22

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 8081

# Default command
CMD ["npm", "run", "web"]
