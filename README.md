# Metrics Ingestion and Aggregation

Simple application to manage realtime metric streams.

Managed as a [monorepo](https://en.wikipedia.org/wiki/Monorepo) with the following deployable micro services
* **Ingest service** to feed the stream of metric records
* **Metric aggregator** that aggregates incoming metric records in realtime based on metric type
* **Metrics APIs** to read the aggregated metric values

## Getting Started

The easiest way to get going is using docker with the provided docker-compose file.
### Running in Docker
Run the below npm script from repo root to build and create the docker images for all the services
```bash
npm run distDocker
```

And then start the containers, for the metrics services and dependent services
```bash
docker-compose up
```

### Usage
Once the containers are running the ingest and API services are available on ports `8000` and `7000` respectively. 
```bash
curl http://localhost:8000/health/ping   
> pong (metrics-ingest service)
```

```bash
curl http://localhost:7000/health/ping
> pong (metrics-api service)
```

**Ingest data**
```bash
curl -X POST http://localhost:8000/ingest/metrics \
     -H 'Content-Type: application/json' \
     -d '{"level": "application",
          "name": "server.get.timer",
          "type": "TIMER",
          "value": 1
     }' 
```
**Read metrics via API service**
```bash
curl  http://localhost:7000/data/metrics/application.server.get.timer
```
#### Supported Metric types
Following metric types are supported 
* **Meter**: Measures the count and mean rate
* **Counter**: Tracks the changes (increments and decrements) to the value
* **Timer**: Timing values and their stats vaklues like min, max and mean

#### Supported data stores
Store type can be configured via the `STORE` config and following are the supported store types
* **Redis**: Leveraged as a basic key-value store
* **In-memory**: For testing and scope limited to aggregator service
* ~~**Kafka**: Kafka streams KTable as the store~~. (To be implemented)

### Future work
Since this is part of weekend quest learn Typescript, extensive frameworks have been deliberately avoided. And following is the wishlist for future work
* Unit tests ([jest](https://jestjs.io/))
* Websocket for metrics-api ([socket.io](https://socket.io/docs/v4/typescript/))
* Kafka KTable as the store ([kafka-streams](https://www.npmjs.com/package/kafka-streams))
* Custom Envelope SerDes
* Monorepo management ([lerna](https://lerna.js.org/))
* AWS deployment
* Dependency Injection ([InversifyJS](https://github.com/inversify/InversifyJS))