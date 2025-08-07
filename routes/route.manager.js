const authRoute = require("./auth/auth.route")

const routeManager = (app) => {
    // API Routes
    app.use("/auth", authRoute);

}

module.exports = routeManager
