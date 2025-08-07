const mongoose = require('mongoose');

// Assignment schema for module assignments
const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  grade: {
    type: Number,
    min: 0,
    max: 100,
    default: null
  },
  submissionDate: {
    type: Date
  },
  feedback: {
    type: String
  }
}, { _id: false });

// Module progress schema
const moduleProgressSchema = new mongoose.Schema({
  moduleIndex: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  grade: {
    type: Number,
    min: 0,
    max: 100,
    default: null
  },
  completedTopics: [{
    type: Number
  }],
  assignments: [assignmentSchema],
  startDate: {
    type: Date
  },
  completionDate: {
    type: Date
  }
}, { _id: false });

// Recent activity schema
const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['completed', 'assignment', 'quiz', 'module', 'login', 'payment'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  }
}, { _id: false });

// Progress tracking schema
const progressSchema = new mongoose.Schema({
  currentModule: {
    type: Number,
    default: 1
  },
  totalModules: {
    type: Number,
    required: true
  },
  modulesCompleted: {
    type: Number,
    default: 0
  },
  averageGrade: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  assignmentsCompleted: {
    type: Number,
    default: 0
  },
  totalAssignments: {
    type: Number,
    default: 0
  },
  modules: [moduleProgressSchema],
  recentActivity: [activitySchema]
}, { _id: false });

// Payment schema
const paymentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  method: {
    type: String,
    enum: ['Bank Transfer', 'Card Payment', 'Cash', 'Mobile Money', 'Crypto'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: {
    type: String
  },
  reference: {
    type: String
  }
}, { 
  timestamps: true,
  _id: true 
});

// Emergency contact schema
const emergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  relationship: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  address: {
    type: String
  }
}, { _id: false });

// Course information schema
const courseInfoSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Beginner to Advanced', 'Intermediate to Advanced']
  },
  instructor: {
    type: String
  }
}, { _id: false });

// Main User/Student schema
const userSchema = new mongoose.Schema({
  // Student identification
  studentId: {
    type: String,
    unique: true,
    required: true
  },
  
  // Personal information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  phoneNumber: {
    type: String,
    required: true
  },
  
  // Location information
  address: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  
  // Personal details
  gender: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  
  // Registration and course dates
  registrationDate: {
    type: Date,
    default: Date.now
  },
  courseStartDate: {
    type: Date
  },
  courseEndDate: {
    type: Date
  },
  
  // Learning setup
  learningMode: {
    type: String,
    enum: ['online', 'offline', 'hybrid'],
    required: true
  },
  hasLaptop: {
    type: String,
    enum: ['yes', 'no'],
    required: true
  },
  laptopModel: {
    type: String
  },
  laptopRam: {
    type: String
  },
  
  // Preferences
  internshipInterest: {
    type: String,
    enum: ['yes', 'no'],
    required: true
  },
  needAccommodation: {
    type: String,
    enum: ['yes', 'no'],
    required: true
  },
  needTshirt: {
    type: String,
    enum: ['yes', 'no'],
    required: true
  },
  roomType: {
    type: String,
  },
  agreeToTerms: {
    type: Boolean,
    required: true,
    default: false
  },
  
  // Course information
  selectedCourse: {
    type: String,
    required: true
  },
  course: courseInfoSchema,
  
  // Progress tracking
  progress: progressSchema,
  
  // Payment information
  paymentStatus: {
    type: String,
    enum: ['current', 'overdue', 'completed', 'suspended'],
    default: 'current'
  },
  attendance: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  payments: [paymentSchema],
  
  // Emergency contact
  emergencyContact: emergencyContactSchema,
  
  // Additional information
  notes: {
    type: String
  },
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  
  // Role and permissions
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  
  // Certificate information
  certificateEligible: {
    type: Boolean,
    default: false
  },
  certificateIssued: {
    type: Boolean,
    default: false
  },
  certificateDate: {
    type: Date
  },
  
  // Profile picture
  profilePicture: {
    type: String
  },
  
  // Last login tracking
  lastLogin: {
    type: Date
  },
  
  // Password reset
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ studentId: 1 });
userSchema.index({ selectedCourse: 1 });
userSchema.index({ paymentStatus: 1 });
userSchema.index({ isActive: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age calculation
userSchema.virtual('age').get(function() {
  if (this.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
  return null;
});

// Method to calculate overall progress percentage
userSchema.methods.calculateOverallProgress = function() {
  if (!this.progress || !this.progress.totalModules) return 0;
  return Math.round((this.progress.modulesCompleted / this.progress.totalModules) * 100);
};

// Method to check certificate eligibility
userSchema.methods.checkCertificateEligibility = function() {
  const overallProgress = this.calculateOverallProgress();
  const hasPassingGrade = (this.progress?.averageGrade || 0) >= 70;
  const hasGoodAttendance = (this.attendance || 0) >= 80;
  
  return overallProgress >= 100 && hasPassingGrade && hasGoodAttendance;
};

// Method to get payment balance
userSchema.methods.getPaymentBalance = function() {
  const totalAmount = this.course?.price || 0;
  const paidAmount = this.payments?.reduce((total, payment) => {
    return payment.status === 'completed' ? total + payment.amount : total;
  }, 0) || 0;
  
  return Math.max(0, totalAmount - paidAmount);
};

// Method to add activity
userSchema.methods.addActivity = function(activityData) {
  if (!this.progress) {
    this.progress = { recentActivity: [] };
  }
  if (!this.progress.recentActivity) {
    this.progress.recentActivity = [];
  }
  
  this.progress.recentActivity.unshift(activityData);
  
  // Keep only the last 20 activities
  if (this.progress.recentActivity.length > 20) {
    this.progress.recentActivity = this.progress.recentActivity.slice(0, 20);
  }
};

// Pre-save middleware to generate studentId if not provided
userSchema.pre('save', function(next) {
  if (!this.studentId) {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9999) + 1;
    this.studentId = `ST${year}${randomNum.toString().padStart(4, '0')}`;
  }
  
  // Update certificate eligibility
  this.certificateEligible = this.checkCertificateEligibility();
  
  next();
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
