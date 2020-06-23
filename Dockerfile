FROM node:latest
RUN mkdir -p "/usr/src/app"
WORKDIR "/usr/src/app"
COPY .env.example .env
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
