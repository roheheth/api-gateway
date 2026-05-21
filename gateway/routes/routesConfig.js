module.exports = [

    {
        route: "/api/users",
        target: "http://user-service:5051",
        protected: false
    },

    {
        route: "/api/products",
        target: "http://product-service:5052",
        protected: false
    },

    {
        route: "/api/orders",
        target: "http://order-service:5053",
        protected: true
    }

];