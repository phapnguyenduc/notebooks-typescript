FROM node:20
WORKDIR /client
COPY public/ /client/public
COPY src/ /client/src
COPY package.json /client/
RUN npm install
CMD [ "npm", "start" ]