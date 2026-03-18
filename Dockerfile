FROM node:18 AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npx ng build --configuration production

FROM nginx:latest
COPY --from=builder /app/dist/employee-crud-frontend/browser /usr/share/nginx/html
EXPOSE 80