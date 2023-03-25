ARG BUILD_FROM
FROM $BUILD_FROM

RUN \
  apk add --no-cache \
    nodejs \
    yarn

COPY ./package.json /package.json
COPY ./yarn.lock /yarn.lock
RUN yarn install
COPY ./src /src
COPY ./config.yaml /config.yaml
COPY ./run.sh /run.sh
COPY ./tsconfig.json /tsconfig.json

RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
