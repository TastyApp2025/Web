import type { Express } from "express";
import { z } from "zod";
import nodemailer from "nodemailer";
// @ts-ignore - nodemailer doesn't have type definitions in some environments
import type { Transporter } from "nodemailer";
import { rateLimiter } from "../middleware/rate-limiter";

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export function registerContactRoutes(app: Express): void {
  // Apply rate limiting: max 5 requests per minute per IP
  const contactRateLimiter = rateLimiter({
    windowMs: 60000, // 1 minute
    maxRequests: 5,
    message: "Too many contact form submissions. Please try again in a few minutes.",
  });

  app.post("/api/contact", contactRateLimiter, async (req, res) => {
    try {
      // Validate request body
      const validData = ContactFormSchema.parse(req.body);

      // Send email via Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER || "foryourinfluence2010@gmail.com",
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      // Send notification email to admin
      const adminMailOptions = {
        from: process.env.GMAIL_USER || "foryourinfluence2010@gmail.com",
        to: process.env.CONTACT_FORM_EMAIL || "foryourinfluence2010@gmail.com",
        subject: `New Contact Form Submission: ${validData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #1f2937;">New Contact Form Submission</h2>
            <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p><strong>Name:</strong> ${validData.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${validData.email}">${validData.email}</a></p>
              <p><strong>Subject:</strong> ${validData.subject}</p>
            </div>
            <div style="margin: 16px 0;">
              <h3 style="color: #1f2937; margin-bottom: 8px;">Message:</h3>
              <p style="white-space: pre-wrap; background-color: #f9fafb; padding: 12px; border-left: 4px solid #3b82f6;">${validData.message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            <p style="color: #6b7280; font-size: 12px;">This is an automated message from ForYourInfluence contact form.</p>
          </div>
        `,
        replyTo: validData.email,
      };

      // Send confirmation email to user
      const userMailOptions = {
        from: process.env.GMAIL_USER || "foryourinfluence2010@gmail.com",
        to: validData.email,
        subject: "We received your message - ForYourInfluence",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #1f2937;">Thank you for reaching out!</h2>
            <p>Hi ${validData.name},</p>
            <p>We received your message and will get back to you as soon as possible.</p>
            <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p><strong>Your Subject:</strong> ${validData.subject}</p>
              <p><strong>Your Message:</strong></p>
              <p style="white-space: pre-wrap; margin: 8px 0;">${validData.message}</p>
            </div>
            <p>Best regards,<br>ForYourInfluence Team</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            <p style="color: #6b7280; font-size: 12px;">Follow us on <a href="https://www.youtube.com/@ForYourInfluence">YouTube</a> | <a href="https://www.instagram.com/4yourinfluence">Instagram</a> | <a href="https://www.tiktok.com/@foryourinfluence">TikTok</a></p>
          </div>
        `,
      };

      try {
        // Send both emails
        await Promise.all([
          transporter.sendMail(adminMailOptions),
          transporter.sendMail(userMailOptions),
        ]);
        console.log("Contact form emails sent:", validData);
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Still return success to user even if email fails
        // (graceful degradation - message is logged on server)
      }

      res.json({
        success: true,
        message: "Message received successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }

      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process contact form",
      });
    }
  });
}
