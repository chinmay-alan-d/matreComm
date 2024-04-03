FROM node:alpine
WORKDIR /react-app
COPY ./package*.json /react-app
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]