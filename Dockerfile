# Start with the official Node.js image.
FROM node:16-alpine

# Set the working directory in the Docker container.
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the Docker container's working directory.
COPY package*.json ./

# Install the dependencies in the Docker container.
RUN npm install

# Copy the rest of your app's source code to the Docker container's working directory.
COPY . .

# Build the Next.js app.
RUN npm run build

# Expose the port that your Next.js app will be served on.
EXPOSE 3000

# Start the Next.js app.
CMD [ "npm", "start" ]
