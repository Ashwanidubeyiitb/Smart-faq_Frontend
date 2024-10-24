# Use an official Node.js image as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app/

# Build the React app
RUN npm run build

# Expose the port that the React app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
