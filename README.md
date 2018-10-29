<h1 align="center">
  <a href="https://barbaraiot.com/"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAb1BMVEXoPkf////pRk7oQUr//PzmMTroQEj1rbDnN0DsXWTnND72sLPubXL85eXoPEX/+/zwfoP97e33urzykJTucXbtZGrwhIn4xsfqS1PzmZ31qKv0oKTtaG797+/+9PTxiI361tfrU1v73t/4wsP609NHvHPPAAAD1UlEQVR4nO3c23baMBCFYctjyY4BYXMIh0AhSd//GStMDmA5TS5m1IHu/6bU7Wr5lkwLeKxsnd9HWe7vowBx2V2U+3/9DJgCRFuAaAsQbQGiLUC0BYi2ANEWINoCRFuAaAsQbQGiLUC0BYi2ANEWINoCRFuAaAsQbQGiLUC0BYi2ANEWJ8S57HIWzBHfH/19nBBvM3IfUVWnnGljhHhXTi47LqqEa8IHITs31/1aJ5wz5ISMzPSCURTmIeGScEJKU1wvyUN1mysCCEeARAHCEyBRgPAESBQgPAESBQhPgEQBwhMgUf8DxFGXqCoJxHZV3glaUkD8odxuN80yt9aLUeQhzq/fDrezJg8Urr/wOnkI1TtTnOosm9zKLEoCiJ2/Hz9h2kZmUVJAZhfHw6ORl5CkeI0cL4+HVflNAhJxSHit/7o+GiQZ/9f04hCqx8b0Ja81+5LIQz5f6xeSueWWJIDMIkigPHO/DZN/sfuXGBJOLu4lkYY4/zztM7qWzFezpCFULwbOrHBoxrwk4hC7MdMBCfuVUmEIObs6r0C0JI+8SyINyVxZPs0mEYX93JL/n70Kn6mypo0WZUKsYzAJ3muFD7mZXU+iNeH9RJ/oyweyu+hFsmB9n5LqWxQKL/riGnJgfZGkg8z7kKfbhPT/YyxMeaOQ3rv5wowAGQqQKEB4AiQKEJ4AiQKEJ0CiAOEJkChAeAIkChCeAIkChCdAogDhCZAostt7+e5303+qF1dAyD7ezrfxf3uqp/tGb+X6SDw9M3Hv80w0MCOk9YqV88/Rc91a383Jko8nUpjHURhvA3fVsf9kTUm2ripr876jMC+8exswQgb+2Qpn19NiuWy2+/g6+1brdfZunLRfET34+PmYd/iMdfMKH59b3WRpMTDBwXxmsULIHoYmgYbin6HjXREXzTd85WiJeT6TFUK2+SmEeTaIe4MXql9/IinMin3MlBfi/DoeAxo6sfj352Decofqh+I7SfgNS81zv+fIjr+RhF8es0/9CmyCRHa5N8ODpV1Ts18KOAR2c6J6vTJfUcLh1Zr/vMpEtqUiXx32ZmC2tAiM9lDJ3NMjsb+WczbftN1Tf7uRp5ief5xscutk7rKS2SgsfP6g5rW9XpB21pDYLVZSO56dPkrZfDcfrY7dDlWr0XwnetOb3NZtjsjX1tY+PHDnRyR0VnVJ7kHX3RCanXdxk74xNMVmepLr8Bl2BdQWINoCRFuAaAsQbQGiLUC0BYi2ANEWINoCRFuAaAsQbQGiLUC0BYi2ANEWINoCRFuAaAsQbQGiLUC0BYi27gXyB5auTCuBJkfdAAAAAElFTkSuQmCC" alt="Barbara IoT logo" width=200"></a>
<br>
  Barbara Data Receiver Example
</h1>


# Introduction

This is an example to gather the messages published in a MQTT topic and store it in a MongoDB database. The client, built in NodeJS, connects to the MQTT server over TLS and starts listening in a topic provided. When a message arrives, it takes the message and inserts it raw in a mongo collection. Both servers are containerized using Docker and can be built and deployed using Docker compose.


# Installation

In order to run this software, it is necessary to install Docker CE. [Find the instructions here.](https://docs.docker.com/install/) Also docker compose is required. [Install docker compose.](https://docs.docker.com/compose/install/)

# Start up the servers
### Clone the repository
First of all, it is necessary to get the code, clone the repository with any tool or just [download the zip](https://github.com/BarbaraIoT-Releases/barbara_data_receiver_example/archive/master.zip) and extract the data inside. 

### Add MQTT certificates
Navigate to the folder where the repository is copied, and paste under the **certs** folder the certificates, using the following names:
`certs/key.pem`
`certs/cert.pem`
`certs/ca.pem`

If you have not generated your certs yet, read the instructions [here](https://www.google.es).

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
After doing any modification to the code, the Docker containers must be rebuilt, to achive so, we have to stop them and then run the following lines:
>docker-compose build
>docker-compose up -d

### Stop a running container in the background
To list the running containers in the server, run the command:
>docker ps

Identify the containers you want to stop, and run:
>docker stop 7f6ecaf856f9 da96f5374cba

In case you want to stop and also delete a running container, execute: 
>docker rm -f  7f6ecaf856f9 da96f5374cba



# Check the data stored
Once the device has started to send data to the mqtt server, the mongodb database should have stored all the information. In order to check the collection in mongo server, any tool can be used. For instance, [Mongo Compass](https://www.mongodb.com/products/compass) 

