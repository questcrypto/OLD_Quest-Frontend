FROM node
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
RUN yarn add recharts
COPY . ./
RUN yarn build

EXPOSE 3000
CMD yarn run start
