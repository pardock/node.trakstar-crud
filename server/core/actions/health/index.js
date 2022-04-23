const { HealthCheckDBRepository } = require("../../infrastructure/healthCheck");

module.exports = {
  healthCheckAction: require("./healthCheckAction")({
    healthCheckDBRepository: HealthCheckDBRepository,
  }),
};
