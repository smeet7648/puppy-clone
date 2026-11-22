import express from 'express';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { dbService } from '../data/store.js';

const router = express.Router();

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(7, 'Please provide a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  puppyId: z.string().optional().nullable(),
  puppyName: z.string().optional().nullable()
});

router.post('/', async (req, res) => {
  try {
    const parseResult = enquirySchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors
      });
    }

    const { name, phone, email, message, puppyId, puppyName } = parseResult.data;

    const saved = await dbService.createEnquiry({
      name,
      phone,
      email,
      message,
      puppyId: puppyId || null,
      puppyName: puppyName || null
    });

    // Send email notification (gracefully logs if SMTP not configured)
    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.ethereal.email',
          port: Number(process.env.SMTP_PORT) || 587,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: `"TeddyPups Dubai" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFICATION_EMAIL || 'concierge@teddypups.ae',
          subject: `New Puppy Concierge Enquiry from ${name}`,
          html: `
            <h2>New Concierge Enquiry received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone / WhatsApp:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${puppyName ? `<p><strong>Puppy of Interest:</strong> ${puppyName}</p>` : ''}
            <p><strong>Message:</strong></p>
            <blockquote style="background: #fdfaf5; padding: 12px; border-left: 4px solid #c2622b;">
              ${message}
            </blockquote>
          `
        });
      } else {
        console.log(`[Notification Email Simulated] New Enquiry from ${name} (${phone}, ${email}) - Puppy: ${puppyName || 'General'}`);
      }
    } catch (mailError) {
      console.warn('Email dispatch failed, but enquiry was recorded:', mailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Our puppy concierge team will contact you on WhatsApp shortly.',
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
