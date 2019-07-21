# EnvoyLoadBalancer
This project repo contains a simple set codes and explanations which can enable someone to set up Envoy as a load balancer with the combination of headless service on Kubernetes cluster. 

## Getting Started with Envoy

From my personal experience with Getting started with Envoy, I could not find much resources online which could help a beginner like me to setup a simple front envoy which would connect to multiple services having their sidecar envoy proxies.

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

## Built With

* [Express](https://expressjs.com/) - The framework used for developing simple services ( service1 and service 2 )

 

## Authors

* **Soumya Mukhopadhyay** 

## Acknowledgments

* Mark Vincze's for this wonderful article [How to use Envoy as a Load Balancer in Kubernetes](https://blog.markvincze.com/how-to-use-envoy-as-a-load-balancer-in-kubernetes/)
