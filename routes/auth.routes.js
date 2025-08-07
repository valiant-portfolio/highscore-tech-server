const express = require('express');
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  getStudentData,
  updateStudentProfile
} = require('../controllers/auth.controller');
const {
  authenticateToken,
  isStudent
} = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
// @desc    Register a new student
// @access  Public
router.post('/register', registerStudent);

// @route   POST /api/auth/login
// @desc    Login student
// @access  Public
router.post('/login', loginStudent);

// @route   GET /api/auth/student
// @desc    Get student data
// @access  Private (Student only)
router.get('/student', authenticateToken, isStudent, getStudentData);

// @route   PUT /api/auth/student/profile
// @desc    Update student profile
// @access  Private (Student only)
router.put('/student/profile', authenticateToken, isStudent, updateStudentProfile);

// @route   POST /api/auth/logout
// @desc    Logout student (client-side token removal)
// @access  Private
router.post('/logout', authenticateToken, (req, res) => {
  // With JWT, logout is typically handled on client-side by removing token
  // But we can log the logout activity
  try {
    req.user.addActivity({
      type: 'login',
      title: 'User Logout',
      description: 'Successfully logged out from student dashboard',
      date: new Date()
    });
    
    req.user.save();

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  }
});

module.exports = router;
