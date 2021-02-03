# syntax = docker/dockerfile:1.0-experimental
FROM node:14.15-alpine as build

# Install npm packages
WORKDIR /usr/src/build
COPY package.json package-lock.json ./
RUN --mount=type=secret,id=npmrc,dst=/root/.npmrc npm install

# Copy code
FROM node:14.15-alpine
WORKDIR /usr/src/app
COPY . .

# Copy node_modules
COPY --from=build /usr/src/build/node_modules ./node_modules

# Build TypeScript files
RUN npm run build

# Run app
EXPOSE 3000
CMD ["npm", "start"]