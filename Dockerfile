FROM node:alpine AS build

WORKDIR /app

COPY . .

RUN npm install

ENV PROJECT="httpdocs"
ENV PORT=80

EXPOSE 80

CMD ["npm", "run", "retrogasteiz"]