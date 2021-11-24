FROM node:latest

ENV PORT 3000

# Create app directory
WORKDIR /usr/src/app

# Copying source files
COPY . /usr/src/app
# Installing dependencies
RUN npm install

EXPOSE 3000

CMD "npm" "start"
