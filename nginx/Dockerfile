FROM nginx:alpine AS setup

WORKDIR /etc/nginx
COPY nginx.conf .
CMD ["nginx", "-g", "daemon off;"]