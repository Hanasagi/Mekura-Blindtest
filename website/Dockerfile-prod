#### Stage 1: Build the react application
FROM node:12.4.0-alpine as build
WORKDIR /website

COPY . ./
# Build the application

#### Stage 2: Serve the React application from Nginx
FROM nginx:1.17.0-alpine
# Copy the react build from Stage 1
COPY --from=build website/build /usr/share/nginx/html
# Copy our custom nginx config (created and placed in the app directory)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80 to the Docker host, so we can access it
# from the outside.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]