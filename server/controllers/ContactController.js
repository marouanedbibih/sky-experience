import nodemailer from 'nodemailer'

export const sendContactMessage = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    })

    // HTML email template with hot air balloon theme colors
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 20px;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }
          
          .header {
            background: linear-gradient(135deg, #ff8c42 0%, #ff6b1a 50%, #e55a1b 100%);
            padding: 30px 20px;
            text-align: center;
            position: relative;
          }
          
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="60" cy="80" r="1" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
            opacity: 0.3;
          }
          
          .header h1 {
            color: #ffffff;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
          }
          
          .header p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            position: relative;
            z-index: 1;
          }
          
          .content {
            padding: 40px 30px;
            background: #ffffff;
          }
          
          .message-info {
            background: linear-gradient(135deg, #fff8f0 0%, #fef4e7 100%);
            border-left: 5px solid #ff8c42;
            padding: 25px;
            border-radius: 8px;
            margin-bottom: 30px;
          }
          
          .info-row {
            display: flex;
            margin-bottom: 15px;
            align-items: center;
          }
          
          .info-row:last-child {
            margin-bottom: 0;
          }
          
          .info-label {
            font-weight: bold;
            color: #2d2d2d;
            min-width: 120px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .info-value {
            color: #444;
            font-size: 16px;
            flex: 1;
          }
          
          .message-section {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 25px;
            border: 2px solid #e9ecef;
          }
          
          .message-title {
            color: #2d2d2d;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }
          
          .message-title::before {
            content: '💬';
            margin-right: 10px;
            font-size: 20px;
          }
          
          .message-text {
            color: #555;
            line-height: 1.8;
            font-size: 16px;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #ff8c42;
            font-style: italic;
          }
          
          .footer {
            background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
            color: #ffffff;
            text-align: center;
            padding: 25px;
            font-size: 14px;
          }
          
          .footer p {
            margin-bottom: 5px;
            opacity: 0.9;
          }
          
          .divider {
            height: 3px;
            background: linear-gradient(90deg, #ff8c42 0%, #ff6b1a 50%, #e55a1b 100%);
            margin: 0;
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 10px;
              border-radius: 10px;
            }
            
            .content {
              padding: 25px 20px;
            }
            
            .info-row {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .info-label {
              margin-bottom: 5px;
              min-width: auto;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>🎈 New Contact Message</h1>
            <p>Someone has reached out through your website</p>
          </div>
          
          <div class="divider"></div>
          
          <div class="content">
            <div class="message-info">
              <div class="info-row">
                <span class="info-label">👤 Name:</span>
                <span class="info-value">${firstName} ${lastName}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">📧 Email:</span>
                <span class="info-value">${email}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">📱 Phone:</span>
                <span class="info-value">${phone || 'Not provided'}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">🕐 Received:</span>
                <span class="info-value">${new Date().toLocaleString()}</span>
              </div>
            </div>
            
            <div class="message-section">
              <div class="message-title">Message Details</div>
              <div class="message-text">${message}</div>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Hot Air Balloon Adventures</strong></p>
            <p>This message was sent from your website contact form</p>
          </div>
        </div>
      </body>
      </html>
    `

    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_USER,
      subject: `🎈 New Contact Message from ${firstName} ${lastName}`,
      text: `
        New Contact Message
        
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Received: ${new Date().toLocaleString()}
        
        Message:
        ${message}
      `,
      html: htmlTemplate
    })

    res.status(200).json({ message: 'Email sent successfully' })

  } catch (error) {
    console.error('Failed to send email:', error)
    res.status(500).json({ message: 'Failed to send email', error: error.message })
  }
}