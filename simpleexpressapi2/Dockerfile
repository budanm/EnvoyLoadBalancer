# Start with the latest image of envoy based on alpine
FROM envoyproxy/envoy-alpine-dev:latest

RUN apk update
#Install node in alpine
RUN apk add --update nodejs nodejs-npm

#Set working directory
WORKDIR /usr/src/app

#Copy package and package.lock and install node modules
COPY package*.json ./
RUN npm install

#Copy remaining files
COPY . .

#Enable execute permissions on start bash script
RUN chmod +x startservice.sh

#Expose port 8080
EXPOSE 8080

#Enable start script
CMD ["sh", "startservice.sh"]