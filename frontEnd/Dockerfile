# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /frontEnd
WORKDIR /frontEnd


# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install a lightweight web server to serve the built files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "dist"]