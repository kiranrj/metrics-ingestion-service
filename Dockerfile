FROM node:18

EXPOSE 8000

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

COPY ./.env ./.env
COPY dist ./dist

# CMD ["npm", "start"]
# For graceful exit via CTRL+C
CMD ["node", "dist/index.js"]