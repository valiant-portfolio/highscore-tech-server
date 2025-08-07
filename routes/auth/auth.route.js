const express = require('express');
const router = express.Router();
const middleware = require("../../middleware/authMiddleware")
const controller = require("../../controllers/auth.controller")


// Public routes (no authentication required)
router.post("/login", controller.loginStudent);
router.post("/register", controller.registerStudent);
router.get("/get-student",middleware, controller.getStudentData);

module.exports = router;