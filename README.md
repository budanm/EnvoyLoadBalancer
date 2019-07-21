# Envoy as a LoadBalancer using built-in support for a service discovery technique it calls STRICT_DNS
This project repo contains a simple set codes and explanations which can enable someone to set up Envoy as a load balancer with the combination of headless service on Kubernetes cluster. 

## Getting Started with Envoy

From my personal experience with Getting started with Envoy, I could not find much resources online which could help a beginner like me to setup a simple front envoy which would connect to multiple services having their sidecar envoy proxies.

Below is a simple illustration of the deployment diagram which represents the final look of the components when they are deployed on a Kubernetes cluster

![Envoy proxy mesh diagram](envoyproxymeshdeploymentdiagram.png?raw=true "Deployment diagram")


### Why Headless service with Envoy proxy mesh ?
In Kubernetes there is a specific kind of service called a headless service, which happens to be very convenient to be used together with Envoy's STRICT_DNS service discovery mode.

A headless service doesn't provide a single IP and load balancing to the underlying pods, but rather it just has DNS configuration which gives us an A record with the pod's IP address for all the pods matching the label selector.  
This service type is intended to be used in scenarios when we want to implement load balancing, and maintaining the connections to the upstream pods ourselves, which is exactly what we can do with Envoy.

We can create a headless service by setting the .spec.clusterIP field to "None".And the way the STRICT_DNS service discovery of Envoy works is that it maintains the IP address of all the A records returned by the DNS, and it refreshes the set of IPs every couple of seconds.

The instructions below will get you a copy of the project up and running on your local machine for development and testing purposes using docker. See deployment for notes on how to deploy the project on a live kubernetes cluster.

### Prerequisites

Following should be installed as prior to the execution of installation instructions

```
a) Docker
b) kubectl - should be configured to a kubernetes cluster of your choice  ( GKE , AWS etc )
```

### Installing on docker

The project comes with a docker-compose file which can be used as it is

Step1: Bring up the envoy using docker-compose
```
docker-compose up  
```

Step2: Verify service 1 is up and running
```
curl localhost:8000/service/1
Expected response : Hello I am a simeple express api service 1
```

Step3: Verify service 2 is up and running
```
curl localhost:8000/service/2 
Expected response : Hello I am a simeple express api service 2
```


## Deployment on K8s cluster

The project comes with the actual code of the services ( express app ) on which the docker images are built
and as well as the yaml ( deployment/ service ) files which are required for deployment on kubernetes cluster

Step1: Deploy the first service
```
kubectl apply -f .\simpleexpressapi1\k8s
```

Step2: Deploy the second service
```
kubectl apply -f .\simpleexpressapi2\k8s
```

Step3: Deploy the front proxy
```
kubectl apply -f .\front-envoy-proxy\k8s
```

Step4: Verify the pods and the services
```
kubectl get all
```

Step5: Verify the services endpoint url
```
Extract the envoy load balancer url
Check curl <load_balancer_url>:80/service/1
Check curl <load_balancer_url>:80/service/2
```
## Modification avenues for the project
If needed you can make changes to the service code and build the dockerfile using your own tag . However please do not forget to point to change in the corresponding deployment yaml files to point to the new docker images which you have pushed.

## Built With

* [Express](https://expressjs.com/) - The framework used for developing simple services ( service1 and service 2 )

 

## Authors

* **Soumya Mukhopadhyay** 

## Acknowledgments

* Mark Vincze's for this wonderful article [How to use Envoy as a Load Balancer in Kubernetes](https://blog.markvincze.com/how-to-use-envoy-as-a-load-balancer-in-kubernetes/)
