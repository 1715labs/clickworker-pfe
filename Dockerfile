FROM node:10.17.0-alpine

RUN mkdir /src
RUN chown -R node:node /src
WORKDIR /src
RUN apk add --no-cache git
USER node

COPY package.json /src/
COPY package-lock.json /src/
RUN npm install --unsafe-perm

COPY . /src/

RUN NODE_ENV=production npm run _build



FROM amazonlinux:latest
RUN yum -y install awscli

RUN mkdir /dist
COPY --from=0 /src/dist /dist
