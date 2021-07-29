FROM node as build-stage
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
RUN yarn add recharts
COPY . ./
RUN yarn build
EXPOSE 3000
#CMD yarn run start
FROM nginx
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
