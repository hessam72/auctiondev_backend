FROM node:24-alpine
# RUN apk add --no-cache python3 make g++
RUN npm i -g nodemon
RUN npm i -g babel-node
RUN npm i -g @babel/node
RUN npm i -g @babel/core
RUN echo "-------------DEV----------------"
RUN mkdir -p /usr/src/app
RUN chmod -R 777 /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
# COPY node_modules /usr/src/app/
RUN npm install --legacy-peer-deps
COPY . /usr/src/app
COPY .env /usr/src/app
EXPOSE 4040
CMD  ["npm","start"]
