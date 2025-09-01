const authRoute = require("./auth/auth.route")
const Blog = require("./auth/auth.route")

const routeManager = (app) => {
    // API Routes
    app.use("/auth", authRoute);
    app.use("/api", Blog);

}

module.exports = routeManager
