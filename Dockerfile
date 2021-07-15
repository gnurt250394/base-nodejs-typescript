# # Common build stage
# FROM node:14.14.0-alpine3.12 as common-build-stage

# COPY . ./app

# WORKDIR /app

# RUN npm install

# EXPOSE 8769

# # Dvelopment build stage
# FROM common-build-stage as development-build-stage

# ENV NODE_ENV development

# CMD ["npm", "run", "dev"]

# # Production build stage
# FROM common-build-stage as production-build-stage

# ENV NODE_ENV production

# CMD ["npm", "run", "start"]
FROM node:10.23.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
RUN npm cache clean --force
# RUN rm -rf  package-lock.json && rm -rf node_modules/
RUN npm install

COPY . .

EXPOSE 8769
CMD ["npm", "start"]
