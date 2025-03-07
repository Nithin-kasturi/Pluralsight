FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:16-slim AS production

WORKDIR /app

COPY --from=build /app .

EXPOSE 3000

CMD ["node","app.js"]