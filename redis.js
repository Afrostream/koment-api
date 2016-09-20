const redis = require("redis");
const redisClient = redis.createClient({url: process.env.REDIS_URL});
// redis setup
redisClient.on("error", function (err) {
    console.error("[ERROR]: [REDIS]: " + err.message);
});

module.exports = redisClient;
