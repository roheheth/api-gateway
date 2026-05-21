const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const { createProxyMiddleware } = require("http-proxy-middleware");

const authMiddleware = require("./middleware/auth");
const rateLimiter = require("./middleware/rateLimiter");

const routes = require("./routes/routesConfig");

const logger = require("./logger");

dotenv.config();

const app = express();

// ======================================
// GLOBAL MIDDLEWARES
// ======================================

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

// ======================================
// REQUEST LOGGER MIDDLEWARE
// ======================================

app.use((req, res, next) => {

    logger.info(
        `${req.method} ${req.originalUrl}`
    );

    next();

});

// ======================================
// LATENCY MONITORING MIDDLEWARE
// ======================================

app.use((req, res, next) => {

    const start = Date.now();

    res.on("finish", () => {

        const duration = Date.now() - start;

        logger.info(
            `${req.method} ${req.originalUrl} | Status: ${res.statusCode} | ${duration}ms`
        );

        // Slow Request Detection
        if (duration > 1000) {

            logger.error(
                `SLOW REQUEST: ${req.method} ${req.originalUrl} took ${duration}ms`
            );

        }

    });

    next();

});

// ======================================
// HEALTH CHECK ROUTE
// ======================================

app.get("/", (req, res) => {

    res.json({
        message: "Custom API Gateway Running"
    });

});

// ======================================
// LOGIN ROUTE
// ======================================

app.get("/login", (req, res) => {

    // Simulated User
    const user = {
        id: 1,
        username: "rohith",
        role: "premium"
    };

    // Generate JWT
    const token = jwt.sign(
        user,
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    logger.info(
        `JWT Generated For User: ${user.username}`
    );

    res.json({
        token
    });

});

// ======================================
// DYNAMIC ROUTE LOADER
// ======================================

routes.forEach((service) => {

    const middlewares = [];

    // Protected Routes
    if (service.protected) {

        middlewares.push(authMiddleware);

        middlewares.push(rateLimiter);

    }

    // Proxy Middleware
    middlewares.push(

        createProxyMiddleware({

            target: service.target,

            changeOrigin: true,

            onProxyReq: (proxyReq, req, res) => {

                logger.info(
                    `Forwarding ${req.method} ${req.originalUrl} -> ${service.target}`
                );

            }

        })

    );

    // Register Route Dynamically
    app.use(service.route, ...middlewares);

});

// ======================================
// SERVER START
// ======================================

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {

    logger.info(
        `Gateway running on port ${PORT}`
    );

});