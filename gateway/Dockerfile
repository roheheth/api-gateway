FROM node:20

# Working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose gateway port
EXPOSE 5050

# Start application
CMD ["npm", "run", "dev"]