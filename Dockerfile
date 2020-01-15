FROM 1715labs/build-pfe:latest

WORKDIR /src
COPY package.json .
COPY package-lock.json .
RUN npm install --unsafe-perm
COPY . /src/
RUN NODE_ENV=production npm run _build

FROM 1715labs/amazonlinux-cli:latest

RUN mkdir /dist
COPY --from=0 /src/dist /dist
