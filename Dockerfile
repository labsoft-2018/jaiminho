FROM "node:9.7.1"

# ARG NPM_TOKEN 
WORKDIR /usr/src/app

# COPY .npmrc .npmrc
COPY package.json package.json

RUN yarn install

COPY . .

EXPOSE 3002

# RUN rm .npmrc
CMD [ "npm", "start" ]