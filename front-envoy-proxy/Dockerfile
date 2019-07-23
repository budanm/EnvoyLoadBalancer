
FROM envoyproxy/envoy-dev:latest

RUN apt-get update && apt-get -q install -y curl
COPY front-envoy.yaml /etc/
COPY example-com.crt /etc/
COPY example-com.key /etc/
CMD /usr/local/bin/envoy -c /etc/front-envoy.yaml --service-cluster front-proxy
EXPOSE 443
EXPOSE 80
EXPOSE 8000