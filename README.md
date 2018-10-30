<h1 align="center">
  <a href="https://www.barbaraiot.com">Barbara IoT</a><br>
  Barbara Data Receiver Example
</h1>

<br/>

# Introduction

This is an example to gather the messages published in a MQTT topic and store it in a MongoDB database. The client, built in NodeJS, connects to the MQTT server over TLS and starts listening in a topic provided. When a message arrives, it takes the message and inserts it raw in a mongo collection. Both servers are containerized using Docker and can be built and deployed using Docker compose.

<br/>

# Installation

In order to run this software, it is necessary to install Docker CE. [Find the instructions here.](https://docs.docker.com/install/) Also docker compose is required. [Install docker compose.](https://docs.docker.com/compose/install/)

<br/>

# Start up the servers
### Clone the repository
First of all, it is necessary to get the code, clone the repository with any tool or just [download the zip](https://github.com/BarbaraIoT-Releases/barbara_data_receiver_example/archive/master.zip) and extract the data inside. 

### Add MQTT certificates
Navigate to the folder where the repository is copied, and paste under the **certs** folder the certificates, using the following names:
`certs/client.key`
`certs/client.crt`
`certs/ca.crt`

If you have not generated your certs yet, read the instructions [here](https://github.com/BarbaraIoT-Releases/barbara_mqtt_server_example#generate-the-certificates).

### Define MQTT server url and the topic
To set the server url and the topic to parse, in the root path of the repository, open the file **docker-compose.yaml** and edit the lines 22 and 23:
>-- HOST=example.com
>-- TOPIC=topicName

This will set the values as environment variables inside the node server.


### Run the containers
In the root path of the repository, run the containers with this command:
> docker-compose up

To run the containers in the background, just add a -d flag at the end of the line:
> docker-compose up -d


### Build again the containers
After doing any modification to the code, the Docker containers must be rebuilt, to achieve so, we have to stop them and then run the following lines:
>docker-compose build
>docker-compose up -d

### Stop a running container in the background
To list the running containers in the server, run the command:
>docker ps

Identify the containers you want to stop, and run:
>docker stop 7f6ecaf856f9 da96f5374cba

In case you want to stop and also delete a running container, execute: 
>docker rm -f  7f6ecaf856f9 da96f5374cba

<br/>

# Check the data stored
Once the device has started to send data to the mqtt server, the mongodb database should have stored all the information. In order to check the collection in mongo server, any tool can be used. For instance, [Mongo Compass](https://www.mongodb.com/products/compass) or [Studio 3T](https://studio3t.com/download/)

