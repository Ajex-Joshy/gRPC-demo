FROM node:22-alpine

WORKDIR /app

COPY user-service/package*.json ./
RUN npm install

COPY user-service/ .
COPY proto/ /proto/

EXPOSE 50051

CMD ["npm", "run", "dev"]
