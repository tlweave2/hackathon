# Use official Apify SDK base image with Playwright
FROM apify/actor-node-playwright-chrome:20

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --include=optional

# Copy source code
COPY . ./

# Run the Actor
CMD npm start
