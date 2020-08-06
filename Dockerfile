FROM node:lts-alpine3.9 AS build
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV=${NODE_ENV}
RUN npm install

FROM node:lts-alpine3.9
COPY . .
COPY --from=build /usr/src/app /usr/src/app
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
CMD ["node", "index.js"]