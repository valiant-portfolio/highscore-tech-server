// Welcome email template for new students
const generateWelcomeEmail = (studentData) => {
  const { firstName, lastName, studentId, course, courseStartDate } = studentData;
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to HighScore Tech!</title>
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
            padding: 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            position: relative;
            overflow: hidden;
        }
        
        /* Background particles animation */
        .particles {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
            z-index: 1;
        }
        
        .content {
            position: relative;
            z-index: 2;
            padding: 0;
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
            padding: 40px 30px;
            text-align: center;
            border-bottom: 3px solid #06b6d4;
        }
        
        .logo-container {
            margin-bottom: 20px;
        }
        
        .logo-circle {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #06b6d4 0%, #4f46e5 100%);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4);
        }
        
        .logo-text {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
        }
        
        .company-name {
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 10px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .tagline {
            font-size: 16px;
            color: #e2e8f0;
            opacity: 0.9;
        }
        
        /* Main content */
        .main-content {
            padding: 40px 30px;
        }
        
        .welcome-badge {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            display: inline-block;
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 30px;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }
        
        .main-heading {
            font-size: 32px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #06b6d4 0%, #2563eb 50%, #7c3aed 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .welcome-text {
            font-size: 16px;
            color: #e2e8f0;
            margin-bottom: 30px;
            text-align: center;
            line-height: 1.8;
        }
        
        /* Student info card */
        .student-info {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 30px;
            margin: 30px 0;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .info-row:last-child {
            border-bottom: none;
        }
        
        .info-label {
            font-weight: 600;
            color: #60a5fa;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .info-value {
            font-weight: bold;
            color: #ffffff;
            font-size: 16px;
        }
        
        /* Course highlight */
        .course-highlight {
            background: linear-gradient(135deg, #ec4899 0%, #f97316 100%);
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
            box-shadow: 0 8px 25px rgba(236, 72, 153, 0.3);
        }
        
        .course-icon {
            font-size: 40px;
            margin-bottom: 15px;
        }
        
        .course-name {
            font-size: 20px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 10px;
        }
        
        .course-duration {
            font-size: 14px;
            color: #ffffff;
            opacity: 0.9;
        }
        
        /* Next steps */
        .next-steps {
            background: rgba(255, 255, 255, 0.03);
            border-left: 4px solid #06b6d4;
            border-radius: 0 15px 15px 0;
            padding: 25px;
            margin: 30px 0;
        }
        
        .next-steps h3 {
            color: #06b6d4;
            font-size: 18px;
            margin-bottom: 20px;
            font-weight: bold;
        }
        
        .step-list {
            list-style: none;
            padding: 0;
        }
        
        .step-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;
            color: #e2e8f0;
        }
        
        .step-number {
            background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        /* CTA Button */
        .cta-container {
            text-align: center;
            margin: 40px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
            color: white;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 16px;
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
            transition: transform 0.2s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.5);
        }
        
        /* Footer */
        .footer {
            background: rgba(0, 0, 0, 0.3);
            padding: 30px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .social-links {
            margin-bottom: 20px;
        }
        
        .social-link {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            border-radius: 50%;
            margin: 0 10px;
            text-decoration: none;
            color: white;
            line-height: 40px;
            font-weight: bold;
        }
        
        .footer-text {
            color: #94a3b8;
            font-size: 14px;
            line-height: 1.6;
        }
        
        .contact-info {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .contact-info a {
            color: #06b6d4;
            text-decoration: none;
        }
        
        /* Responsive */
        @media (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }
            
            .header, .main-content, .footer {
                padding-left: 20px;
                padding-right: 20px;
            }
            
            .main-heading {
                font-size: 24px;
            }
            
            .info-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="particles"></div>
        <div class="content">
            <!-- Header -->
            <div class="header">
                <div class="logo-container">
                    <div class="logo-circle">
                        <div class="logo-text">HT</div>
                    </div>
                </div>
                <div class="company-name">HighScore Tech</div>
                <div class="tagline">Elevating Technology, Empowering Developers</div>
            </div>
            
            <!-- Main Content -->
            <div class="main-content">
                <div style="text-align: center;">
                    <div class="welcome-badge">🎉 Registration Successful</div>
                </div>
                
                <h1 class="main-heading">
                    Welcome to <span class="gradient-text">HighScore Tech</span>, ${firstName}!
                </h1>
                
                <p class="welcome-text">
                    Congratulations on taking the first step towards transforming your tech career! 
                    We're thrilled to have you join our community of aspiring developers and tech innovators.
                </p>
                
                <!-- Student Information -->
                <div class="student-info">
                    <div class="info-row">
                        <div class="info-label">Full Name</div>
                        <div class="info-value">${firstName} ${lastName}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Student ID</div>
                        <div class="info-value">${studentId}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Course Start Date</div>
                        <div class="info-value">${formatDate(courseStartDate)}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Registration Date</div>
                        <div class="info-value">${formatDate(new Date())}</div>
                    </div>
                </div>
                
                <!-- Course Highlight -->
                <div class="course-highlight">
                    <div class="course-icon">${course.icon}</div>
                    <div class="course-name">${course.courseName}</div>
                    <div class="course-duration">${course.duration} Month Program • ${course.level}</div>
                </div>
                
                <!-- Next Steps -->
                <div class="next-steps">
                    <h3>🚀 What's Next?</h3>
                    <ul class="step-list">
                        <li class="step-item">
                            <div class="step-number">1</div>
                            <div>Check your email for course materials and pre-course resources</div>
                        </li>
                        <li class="step-item">
                            <div class="step-number">2</div>
                            <div>Join our student WhatsApp group for updates and community support</div>
                        </li>
                        <li class="step-item">
                            <div class="step-number">3</div>
                            <div>Access your student dashboard to track progress and assignments</div>
                        </li>
                        <li class="step-item">
                            <div class="step-number">4</div>
                            <div>Prepare for your exciting journey - course starts ${formatDate(courseStartDate)}</div>
                        </li>
                    </ul>
                </div>
                
                <!-- CTA Button -->
                <div class="cta-container">
                    <a href="https://www.highzcore.tech/student" class="cta-button">
                        Access Student Dashboard →
                    </a>
                </div>
                
                <p class="welcome-text">
                    If you have any questions or need assistance, don't hesitate to reach out to our support team. 
                    We're here to ensure your success every step of the way!
                </p>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <div class="social-links">
                    <a href="#" class="social-link">𝕏</a>
                    <a href="#" class="social-link">in</a>
                    <a href="#" class="social-link">f</a>
                    <a href="#" class="social-link">📧</a>
                </div>
                
                <div class="footer-text">
                    <strong>HighScore Tech</strong><br>
                    Premier Software Development & Training Academy<br>
                    Lagos, Nigeria
                </div>
                
                <div class="contact-info">
                    <p>
                        📧 <a href="mailto:info@highzcore.tech">info@highzcore.tech</a> | 
                        🌐 <a href="https://www.highzcore.tech">www.highzcore.tech</a>
                    </p>
                    <p style="margin-top: 15px; font-size: 12px; opacity: 0.7;">
                        © ${new Date().getFullYear()} HighScore Tech. All rights reserved.<br>
                        You're receiving this email because you registered for our training program.
                    </p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

module.exports = generateWelcomeEmail;
