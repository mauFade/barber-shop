FROM node:alpine

WORKDIR ./app

COPY package.json ./
COPY yarn.lock ./ 
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY ./ ./

RUN yarn
# RUN yarn test
RUN yarn build
EXPOSE 8081
CMD ["yarn", "start"]