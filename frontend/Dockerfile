FROM node:16.15.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run", "dev"]

# FROM node:18-alpine

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 8080

# CMD [ "npm", "run", "preview" ]