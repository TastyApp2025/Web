# Contact Form Email Setup

The contact form is now configured to send emails to **foryourinfluence2010@gmail.com**. Emails are sent using Gmail SMTP with nodemailer.

## Configuration

### Environment Variables Required

Add these to your `.env` or `.env.local` file:

```bash
# Gmail Configuration
GMAIL_USER=foryourinfluence2010@gmail.com
GMAIL_PASSWORD=your_gmail_app_password
CONTACT_FORM_EMAIL=foryourinfluence2010@gmail.com
```

## Getting Gmail App Password

Since Gmail requires app passwords for SMTP access (especially with 2FA enabled), follow these steps:

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security** in the left sidebar
3. Enable **2-Step Verification** if not already enabled
4. Go back to Security and find **App passwords**
5. Select "Mail" and "Windows Computer" (or your platform)
6. Google will generate a 16-character app password
7. Copy this password and use it as `GMAIL_PASSWORD` in your `.env` file

## Email Flow

### When a user submits the contact form:

1. **Admin Notification Email** - Sent to foryourinfluence2010@gmail.com
   - Contains: Submitter name, email, subject, and message
   - Reply-To: Submitter's email (easy to reply)
   - Professional HTML formatting

2. **User Confirmation Email** - Sent to the submitter
   - Confirms we received their message
   - Shows them their submitted message back
   - Includes social media links

## Error Handling

If email sending fails:
- The contact form still returns success to the user (graceful degradation)
- Error details are logged on the server console
- The form submission is recorded

## Testing Locally

To test the email functionality locally:

1. Set up Gmail credentials in `.env.local`
2. Run the development server: `npm run dev`
3. Submit a test message via the contact form
4. Check your inbox for both the admin notification and confirmation email

## Alternative Email Services

If you want to use a different email service instead of Gmail, you can modify the transporter configuration in [server/routes/contact.ts](server/routes/contact.ts):

### SendGrid
```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

### Mailgun
```typescript
const transporter = nodemailer.createTransport({
  host: process.env.MAILGUN_SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.MAILGUN_SMTP_USER,
    pass: process.env.MAILGUN_SMTP_PASSWORD,
  },
});
```

## Customization

To change the recipient email, update:
- `CONTACT_FORM_EMAIL` environment variable
- Or modify `site-content.ts` → `contact.contactFormEmail` value

The current configuration defaults to foryourinfluence2010@gmail.com if no environment variable is set.
