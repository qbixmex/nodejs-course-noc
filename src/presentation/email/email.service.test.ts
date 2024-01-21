import nodemailer from 'nodemailer';
import EmailService, { SendMailOptions } from './email.service';

describe('Test on Email Service', () => {

  const mockSendMail = jest.fn();

  //* Mocking createTransport method from nodemailer
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailService = new EmailService();

  const options: SendMailOptions = {
    to: 'michael-jackson@moonwalker.com',
    subject: 'Concert Rehearsal',
    htmlBody: ''
      + '<h1>Test Email</h1>'
      + '<p>Do do et tempor minim ipsum sint tempor.</p>'
      + '<p><strong>Check Attachments:</strong></p>',
  };

  test('Should send email', async () => {

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: options.to,
      subject: options.subject,
      html: options.htmlBody,
      attachments: expect.any(Array),
    });

  });

  test('Should send email with attachments', async () => {

    await emailService.sendEmailWithFileSystemLogs(options.to);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: options.to,
      subject: 'Server Logs',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: "all-logs.log", path: "./logs/all-logs.log" },
        { filename: "high-logs.log", path: "./logs/high-logs.log" },
        { filename: "medium-logs.log", path: "./logs/medium-logs.log" }
      ]),
    });

  });

});