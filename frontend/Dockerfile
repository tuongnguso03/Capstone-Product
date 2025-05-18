# Use official Node.js runtime as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite project
RUN npm run build

# Install a simple server to serve the built files
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "3000"]