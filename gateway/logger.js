const winston = require("winston");

const logger = winston.createLogger({

    level: "info",

    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),

    transports: [

        // Console Logs
        new winston.transports.Console(),

        // All Logs
        new winston.transports.File({
            filename: "logs/combined.log"
        }),

        // Error Logs Only
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        })

    ]

});

module.exports = logger;