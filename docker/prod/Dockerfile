FROM node:24-alpine
RUN echo "-----------PROD------------------"
RUN mkdir -p /usr/src/app
RUN chmod -R 777 /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN ls -li
RUN  npm install
COPY . /usr/src/app
COPY .env /usr/src/app
RUN ls -li
CMD  ["npm","start"]
