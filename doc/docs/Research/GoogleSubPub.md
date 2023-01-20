import CloudSubPubInAction from '@site/src/img/cloud-sub-pub-in-action.png';
import CloudSubPubInAction2 from '@site/src/img/cloud-sub-pub-in-action2.png';
import CloudSubPubPushInAction from '@site/src/img/push-in-action.png';
import CloudSubPubPullInAction from '@site/src/img/pull-in-action.png';

# Google Sub/Pub

### How does Google Sub/Pub work ?

#### What is Cloud Sub/Pub?

Cloud Pub/Sub is a fully managed, real-time messaging service that allows you to send and receive messages between independent applications.

- Built-in resilience stores the message for seven days until the service comes back up, and it's delivered then.
- Fully managed, you don't have to worry about being the single point of failure.
- Scalable handles millions of messages simultaneously.

#### How does Google Sub/Pub fit into a microservice architecture in our case ?

<img src={CloudSubPubInAction} />

#### How does subscribers get messages from Google Sub/Pub ?

<img src={CloudSubPubInAction2} />

#### What is the difference between Push/Pull for subscribers ?

<img src={CloudSubPubPushInAction} />

- required the subscriber to setup the SSL certificate and reachable via DNS.
- it gives subscriber opportunity to scale down to zero.

<img src={CloudSubPubPullInAction} />

- required the subscriber have to alawas online

### How to integrate Google Sub/Pub with a serverless(Cloud run/Cloud function) Application?

Here is a simple example introduction:

- [<u>Cloud Pub/Sub Overview</u>](https://www.youtube.com/watch?v=cvu53CnZmGI&list=PLIivdWyY5sqKwVLe4BLJ-vlh9r9zCdOse)  
  Author: Google Cloud Tech, 2019  
  Retrieved on: 2023
- [<u>Node Js microservices with Cloud PubSub</u>](https://www.youtube.com/watch?v=JA0rvSjr0KM&t=338s)
