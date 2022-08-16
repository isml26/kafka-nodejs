KAFKA_CONFIG = {
  clientId: "kafka1",
  broker: "localhost:9092",
  groupId: "ismail",
  topic: "topic1",
};

DATABASE_CONFIG = {
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
};

KAFKA={
  producer:null,
  consumer:null,
  kafka:null
}

module.exports = {
  KAFKA_CONFIG,
  DATABASE_CONFIG,
  KAFKA
};
