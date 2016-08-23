FROM nginx
MAINTAINER Octoblu <docker@octoblu.com>

COPY package.json .

RUN cat package.json \
      | grep version \
      | head -1 \
      | awk -F: '{ print $2 }' \
      | sed 's/[",]//g' \
      | tr -d '[[:space:]]' > .PKG_VERSION

COPY templates/ templates/

RUN curl -sSL "http://form-service-static.octoblu.com/$(cat .PKG_VERSION)/index.html" -o "/usr/share/nginx/html/index.html"

RUN sed -e \
  "s/PKG_VERSION/$(cat .PKG_VERSION)/" \
  /templates/default.template > \
  /etc/nginx/conf.d/default.conf

RUN cp /templates/*.conf /etc/nginx/conf.d/