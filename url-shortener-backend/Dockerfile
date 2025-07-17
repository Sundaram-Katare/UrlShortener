# url-shortener-backend/Dockerfile

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install

# Change this if you're using "app.js"
CMD ["node", "server.js"]
EXPOSE 5000
