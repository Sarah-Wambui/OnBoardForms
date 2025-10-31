# Step 1: Use a Node.js image
FROM node:18-slim

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for better caching
COPY package*.json ./   

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the React application
RUN npm run build

# Step 7: Install a simple HTTP server to serve the build files
RUN npm install -g serve

# Step 8: Expose the port the app runs on
EXPOSE 3000

# Step 9: Start the application
CMD ["npx", "serve", "-s", "build", "-l", "3000"]