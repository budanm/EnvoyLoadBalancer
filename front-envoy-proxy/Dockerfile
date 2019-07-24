
FROM envoyproxy/envoy-dev:latest

RUN apt-get update && apt-get -q install -y curl
COPY front-envoy.yaml /etc/
COPY certificates/ /etc/
CMD /usr/local/bin/envoy -c /etc/front-envoy.yaml --service-cluster front-proxy --log-level trace
EXPOSE 80
EXPOSE 8001
EXPOSE 443