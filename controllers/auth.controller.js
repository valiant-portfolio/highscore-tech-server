const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { coursesData } = require('../data/coursesData'); // Assuming you'll move this to server
// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET || 'valiantjoeauth', 
    { expiresIn: '7d' }
  );
};

// Generate unique student ID
const generateStudentId = async () => {
  const year = new Date().getFullYear();
  let isUnique = false;
  let studentId;
  
  while (!isUnique) {
    const randomNum = Math.floor(Math.random() * 9999) + 1;
    studentId = `ST${year}${randomNum.toString().padStart(4, '0')}`;
    
    const existingStudent = await User.findOne({ studentId });
    if (!existingStudent) {
      isUnique = true;
    }
  }
  
  return studentId;
};

// Calculate course end date based on duration
const calculateCourseEndDate = (startDate, durationInMonths) => {
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + durationInMonths);
  return endDate;
};

// Initialize progress structure based on course
const initializeCourseProgress = (courseData) => {
  if (!courseData || !courseData.modules) {
    return {
      currentModule: 1,
      totalModules: 0,
      modulesCompleted: 0,
      averageGrade: 0,
      assignmentsCompleted: 0,
      totalAssignments: 0,
      modules: [],
      recentActivity: []
    };
  }

  const modules = courseData.modules.map((module, index) => ({
    moduleIndex: index,
    completed: false,
    grade: null,
    completedTopics: [],
    assignments: module.topics ? module.topics.map((topic, topicIndex) => ({
      title: `${topic} Assignment`,
      completed: false,
      grade: null
    })) : [],
    startDate: null,
    completionDate: null
  }));

  const totalAssignments = modules.reduce((total, module) => total + module.assignments.length, 0);

  return {
    currentModule: 0,
    totalModules: courseData.modules.length,
    modulesCompleted: 0,
    averageGrade: 0,
    assignmentsCompleted: 0,
    totalAssignments,
    modules,
    recentActivity: [{
      type: 'login',
      title: 'Course Registration',
      description: `Successfully registered for ${courseData.name}`,
      date: new Date(),
      score: null
    }]
  };
};

// @desc    Register a new student
// @route   POST /api/auth/register
// @access  Public
const registerStudent = async (req, res) => {
  try {
    const {
      // Personal Information
      firstName,
      lastName,
      phoneNumber,
      address,
      country,
      state,
      city,
      gender,
      dateOfBirth,
      
      // Email and Password
      email,
      password,
      confirmPassword,
      
      // Learning Setup
      learningMode,
      hasLaptop,
      laptopModel,
      laptopRam,
      
      // Preferences
      internshipInterest,
      needAccommodation,
      needTshirt,
      roomType,
      
      // Course Selection
      selectedCourse,
      
      // Terms Agreement
      agreeToTerms
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !phoneNumber || !address || 
        !country || !city || !gender || !dateOfBirth || !learningMode || !hasLaptop || 
        !internshipInterest || !needAccommodation || !needTshirt || !selectedCourse || !agreeToTerms) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled'
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Password strength validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain uppercase, lowercase, and number'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Find course data
    const courseData = coursesData?.find(course => course.id === selectedCourse);
    if (!courseData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course selected'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate student ID
    const studentId = await generateStudentId();

    // Set course dates
    const courseStartDate = new Date();
    courseStartDate.setDate(courseStartDate.getDate() + 7); // Start next week
    const courseEndDate = calculateCourseEndDate(courseStartDate, courseData.duration);

    // Initialize course progress
    const progress = initializeCourseProgress(courseData);

    // Create course info object
    const courseInfo = {
      courseId: courseData.id,
      courseName: courseData.name,
      duration: courseData.duration,
      price: courseData.price,
      level: courseData.level,
      instructor: courseData.instructor
    };

    // Create new user
    const newUser = new User({
      studentId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      country: country.trim(),
      state: state?.trim() || '',
      city: city.trim(),
      gender,
      dateOfBirth: new Date(dateOfBirth),
      registrationDate: new Date(),
      courseStartDate,
      courseEndDate,
      learningMode,
      hasLaptop,
      laptopModel: laptopModel?.trim() || '',
      laptopRam: laptopRam?.trim() || '',
      internshipInterest,
      needAccommodation,
      needTshirt,
      roomType: roomType || '',
      agreeToTerms,
      selectedCourse,
      course: courseInfo,
      progress,
      paymentStatus: 'current',
      attendance: 0,
      payments: [],
      notes: '',
      isActive: true,
      isVerified: false,
      role: 'student'
    });

    const savedUser = await newUser.save();

    // Generate JWT token
    const token = generateToken(savedUser._id);

    // Remove password from response
    const userResponse = savedUser.toObject();
    delete userResponse.password;
    delete userResponse.resetPasswordToken;
    delete userResponse.resetPasswordExpires;

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
};

// @desc    Login student
// @route   POST /api/auth/login
// @access  Public
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Email format validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Find user by email
    const user = await User.findOne({ 
      email: email.toLowerCase().trim(),
      isActive: true 
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    
    // Add login activity
    user.addActivity({
      type: 'login',
      title: 'User Login',
      description: 'Successfully logged into student dashboard',
      date: new Date()
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Remove sensitive data from response
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.resetPasswordToken;
    delete userResponse.resetPasswordExpires;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
};

// @desc    Get student data
// @route   GET /api/auth/student
// @access  Private
const getStudentData = async (req, res) => {
  try {
    // Get user from middleware (req.user should be set by auth middleware)
    const userId = req.user?.userId || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No user found in request'
      });
    }

    // Find user by ID
    const user = await User.findById(userId).select('-password -resetPasswordToken -resetPasswordExpires');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Update certificate eligibility
    // user.certificateEligible = user.checkCertificateEligibility();
    // await user.save();

    res.status(200).json({
      success: true,
      message: 'Student data retrieved successfully',
      data: user
    });

  } catch (error) {
    console.error('Get student data error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching student data'
    });
  }
};

// @desc    Update student profile
// @route   PUT /api/auth/student/profile
// @access  Private
const updateStudentProfile = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?._id;
    const updates = req.body;

    // Remove sensitive fields that shouldn't be updated via this endpoint
    delete updates.password;
    delete updates.email;
    delete updates.studentId;
    delete updates.role;
    delete updates.payments;
    delete updates.progress;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password -resetPasswordToken -resetPasswordExpires');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });

  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error while updating profile'
    });
  }
};

const fetchAllStudents = async (req, res)=>{
  try{
    const allUsers = await User.find()
    return res.status(200).json({allUsers})
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating profile'
    });
  }
}

const fetchStudentsById = async (req, res)=>{
  try{
    const {id} = req.params
    if(!id){
        res.status(500).json({
          success: false,
          message: 'Invalid Student Id'
        });
      return

    }
    const user = await User.findOne({studentId: id})
    return res.status(200).json({user})
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating profile'
    });
  }
}


const updateStudentCurrentModule = async (req, res)=>{
  try{
    const {currentModule} = req.body
    const {id} = req.params
    if(!currentModule){
      return  res.status(500).json({
        success: false,
        message: 'Module must have a value'
      });
    }
   const updatedUser = await User.findOneAndUpdate({studentId: id},{
       "progress.currentModule": currentModule
    })

    return res.status(200).json({updatedUser})
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating profile'
    });
  }
}


module.exports = {
  registerStudent,
  loginStudent,
  getStudentData,
  updateStudentProfile,
  fetchAllStudents,
  fetchStudentsById,
  updateStudentCurrentModule
};
