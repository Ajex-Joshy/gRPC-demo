FROM node:22-alpine

# Prisma may require openssl
RUN apk add --no-cache openssl

WORKDIR /app

COPY order-service/package*.json ./
RUN npm install

COPY order-service/ .
COPY proto/ /proto/

# Generate the Prisma client during the build
ENV DATABASE_URL="postgresql://test:test@localhost:5432/test"
RUN npx prisma generate
EXPOSE 50052

# On container startup, sync the database schema and start the service
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npx tsx main.ts"]
