const express = require('express');
const router = express.Router();
const middleware = require("../../middleware/authMiddleware")
const controller = require("../../controllers/auth.controller")


// Public routes (no authentication required)
router.post("/login", controller.loginStudent);
router.post("/register", controller.registerStudent);
router.get("/get-student",middleware, controller.getStudentData);
router.get("/get-all-students", controller.fetchAllStudents);
router.get("/get-student-by-id/:id", controller.fetchStudentsById);
router.patch("/update-student-current-module/:id", controller.updateStudentCurrentModule);

module.exports = router;