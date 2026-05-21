const redisClient = require("../config/redis");

const logger = require("../logger");

const rateLimiter = async (req, res, next) => {

    try {

        // IP Address
        const ip = req.ip;

        // User Tier
        const userTier = req.user?.role || "free";

        // Limits
        const limits = {
            free: 5,
            premium: 20
        };

        const maxRequests = limits[userTier];

        // Redis Key
        const key = `rate_limit:${ip}`;

        // Increment Counter
        const requests = await redisClient.incr(key);

        // Set Expiry for First Request
        if (requests === 1) {
            await redisClient.expire(key, 60);
        }

        // Block Excess Requests
        if (requests > maxRequests) {

            logger.error(
                `Rate Limit Exceeded | IP: ${ip} | Tier: ${userTier}`
            );

            return res.status(429).json({
                message: "Too many requests",
                limit: maxRequests
            });

        }

        next();

    } catch (error) {

        logger.error(
            `Rate Limiter Error: ${error.message}`
        );

        return res.status(500).json({
            message: "Rate limiter error"
        });

    }

};

module.exports = rateLimiter;