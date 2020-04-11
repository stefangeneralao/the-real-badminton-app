FROM node:12-alpine
WORKDIR /app/
COPY dist ./
RUN npm install -g http-server
EXPOSE 3011
CMD [ "http-server", "-p", "3011", "." ]