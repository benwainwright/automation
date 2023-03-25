ARG BUILD_FROM
FROM $BUILD_FROM

RUN \
  apk add --no-cache \
    nodejs \
    yarn

COPY . /
RUN yarn install
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
