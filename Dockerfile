# syntax=docker/dockerfile:1

FROM nginx:1.15-alpine
RUN mkdir -p platform/
COPY ./dist platform/config/
COPY nginx_docker.conf platform/nginx_docker.conf
CMD ["nginx", "-g","daemon off;"]
