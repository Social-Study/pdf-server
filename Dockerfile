FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install packages
RUN npm ci --only=production

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "production" ]
