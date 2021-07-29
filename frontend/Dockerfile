# build environment for remote build
#FROM node:lts-lpine as build
#WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH
#COPY package.json /app/package.json
#RUN npm install --silent
#RUN npm install react-scripts@3.0.1 -g --silent
#COPY . /app
#RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY /build usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]