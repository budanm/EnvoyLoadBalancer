
FROM envoyproxy/envoy-dev:latest

RUN apt-get update && apt-get -q install -y curl
COPY front-envoy.yaml /etc/
CMD /usr/local/bin/envoy -c /etc/front-envoy.yaml --service-cluster front-proxy
EXPOSE 80
EXPOSE 8000