FROM node:14

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

RUN npm ci
# If you are building your code for production
# RUN npm ci --only=production

RUN npm run start

EXPOSE 5000
CMD [ "npm", "start" ]