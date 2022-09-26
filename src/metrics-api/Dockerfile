FROM node:18

EXPOSE 8000

WORKDIR /app

# Install dependencies
COPY ../../package*.json ./
RUN npm install --production

COPY .env .env
COPY dist/metrics-api ./dist/metrics-api
COPY dist/common ./dist/common

# CMD ["npm", "start"]
# For graceful exit via CTRL+C
CMD ["node", "dist/metrics-api/index.js"]