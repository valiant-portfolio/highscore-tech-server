// Admin notification email template for new student registrations
const generateAdminNotificationEmail = (studentData) => {
  const { firstName, lastName, email, phoneNumber, studentId, course, address, country, city, learningMode, selectedCourse } = studentData;
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Student Registration - HighScore Tech</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #ffffff;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            margin: 0;
            padding: 20px;
        }
        
        .email-container {
            max-width: 650px;
            margin: 0 auto;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, #f97316 0%, #ec4899 100%);
            padding: 30px;
            text-align: center;
            position: relative;
        }
        
        .alert-badge {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50px;
            padding: 12px 24px;
            display: inline-block;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
        }
        
        .alert-icon {
            font-size: 24px;
            margin-right: 10px;
        }
        
        .header-title {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 8px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .header-subtitle {
            font-size: 14px;
            color: #ffffff;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        /* Main content */
        .main-content {
            padding: 40px 30px;
        }
        
        .notification-text {
            font-size: 16px;
            color: #e2e8f0;
            text-align: center;
            margin-bottom: 30px;
            line-height: 1.7;
        }
        
        /* Student details card */
        .student-details {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 30px;
            margin: 30px 0;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        .section-title {
            color: #06b6d4;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .section-icon {
            font-size: 20px;
        }
        
        .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 25px;
        }
        
        .detail-item {
            background: rgba(255, 255, 255, 0.03);
            padding: 15px;
            border-radius: 10px;
            border-left: 3px solid #2563eb;
        }
        
        .detail-label {
            font-size: 12px;
            color: #60a5fa;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
            font-weight: 600;
        }
        
        .detail-value {
            font-size: 14px;
            color: #ffffff;
            font-weight: 500;
        }
        
        .full-width {
            grid-column: 1 / -1;
        }
        
        /* Course info highlight */
        .course-info {
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
            border-radius: 15px;
            padding: 25px;
            margin: 25px 0;
            text-align: center;
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
        }
        
        .course-title {
            font-size: 20px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 8px;
        }
        
        .course-meta {
            font-size: 14px;
            color: #ffffff;
            opacity: 0.9;
        }
        
        /* Quick stats */
        .quick-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin: 30px 0;
        }
        
        .stat-item {
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #06b6d4;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 12px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        /* Action buttons */
        .actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 30px 0;
        }
        
        .action-btn {
            padding: 15px 25px;
            border-radius: 12px;
            text-decoration: none;
            text-align: center;
            font-weight: bold;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
            color: white;
        }
        
        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* Footer */
        .footer {
            background: rgba(0, 0, 0, 0.3);
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer-text {
            color: #94a3b8;
            font-size: 14px;
            line-height: 1.6;
        }
        
        .timestamp {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 12px;
            color: #60a5fa;
        }
        
        /* Responsive */
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .email-container {
                width: 100%;
            }
            
            .header, .main-content, .footer {
                padding-left: 20px;
                padding-right: 20px;
            }
            
            .details-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .quick-stats {
                grid-template-columns: 1fr;
            }
            
            .actions {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="alert-badge">
                <span class="alert-icon">🔔</span>
                <strong>NEW REGISTRATION</strong>
            </div>
            <div class="header-title">Student Registration Alert</div>
            <div class="header-subtitle">HighScore Tech Admin Panel</div>
        </div>
        
        <!-- Main Content -->
        <div class="main-content">
            <p class="notification-text">
                A new student has successfully registered for the <strong>${course.courseName}</strong> program. 
                Please review the student details below and take necessary actions.
            </p>
            
            <!-- Student Details -->
            <div class="student-details">
                <div class="section-title">
                    <span class="section-icon">👤</span>
                    Student Information
                </div>
                
                <div class="details-grid">
                    <div class="detail-item">
                        <div class="detail-label">Full Name</div>
                        <div class="detail-value">${firstName} ${lastName}</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Student ID</div>
                        <div class="detail-value">${studentId}</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Email Address</div>
                        <div class="detail-value">${email}</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Phone Number</div>
                        <div class="detail-value">${phoneNumber}</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Location</div>
                        <div class="detail-value">${city}, ${country}</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Learning Mode</div>
                        <div class="detail-value">${learningMode === 'online' ? '💻 Online' : '🏢 Offline'}</div>
                    </div>
                    
                    <div class="detail-item full-width">
                        <div class="detail-label">Address</div>
                        <div class="detail-value">${address}</div>
                    </div>
                </div>
            </div>
            
            <!-- Course Information -->
            <div class="course-info">
                <div class="course-title">${course.courseName}</div>
                <div class="course-meta">
                    ${course.duration} Month Program • ${course.level} • 
                    ₦${course.price.toLocaleString()}
                </div>
            </div>
            
            <!-- Quick Stats -->
            <div class="quick-stats">
                <div class="stat-item">
                    <div class="stat-number">${new Date().getDate()}</div>
                    <div class="stat-label">Day of Month</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">NEW</div>
                    <div class="stat-label">Registration</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${course.duration}M</div>
                    <div class="stat-label">Course Duration</div>
                </div>
            </div>
            
            <!-- Actions -->
            <div class="actions">
                <a href="mailto:${email}" class="action-btn btn-primary">
                    📧 Contact Student
                </a>
                <a href="https://www.highzcore.tech/admin" class="action-btn btn-secondary">
                    🔧 Admin Dashboard
                </a>
            </div>
            
            <!-- Student Details Summary -->
            <div class="student-details">
                <div class="section-title">
                    <span class="section-icon">📋</span>
                    Registration Summary
                </div>
                
                <div class="details-grid">
                    <div class="detail-item">
                        <div class="detail-label">Registration Date</div>
                        <div class="detail-value">${formatDate(new Date())}</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Course ID</div>
                        <div class="detail-value">${selectedCourse}</div>
                    </div>
                    
                    <div class="detail-item full-width">
                        <div class="detail-label">Next Steps</div>
                        <div class="detail-value">
                            1. Verify student information<br>
                            2. Send course materials<br>
                            3. Add to WhatsApp group<br>
                            4. Schedule orientation call
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">
                <strong>HighScore Tech Admin Notification System</strong><br>
                This email was automatically generated when a new student registered.
            </div>
            
            <div class="timestamp">
                Generated on ${formatDate(new Date())} | Server Time (UTC)
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

module.exports = generateAdminNotificationEmail;
