KAFKA_CONFIG = {
  clientId: "kafka1",
  broker: "10.0.74.66:9092",
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

module.exports = {
  KAFKA_CONFIG,
  DATABASE_CONFIG,
};
