FROM node:18

WORKDIR /app

# Install dependencies
COPY ../../package*.json ./
RUN npm install --production

COPY .env .env
COPY dist/metrics-ensemble ./dist/metrics-ensemble
COPY dist/common ./dist/common

# CMD ["npm", "start"]
# For graceful exit via CTRL+C
CMD ["node", "dist/metrics-ensemble/index.js"]