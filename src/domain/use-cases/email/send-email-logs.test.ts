import { after } from 'node:test';
import LogEntity from '../../entities/log.entity';
import LogRepository from '../../repository/log.repository';
import SendEmailLogs from './send-email-logs';

describe('Test on Send Email Logs', () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('Should call sendEmail() and saveLog()', async () => {

    const result = await sendEmailLogs.execute('qbixmex@gmail.com');

    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity)); 
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      level: "low",
      message: "Log email sent",
      origin: "send-email-logs.ts",
      createdAt: expect.any(Date),
    }); 
    expect(mockLogRepository.getLogs).toHaveBeenCalledTimes(0); 

  });

  test('Should log errors', async () => {

    mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);

    const result = await sendEmailLogs.execute('bad123@baddomain.com');

    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity)); 
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      level: "high",
      message: "Error sending email: Email not sent !",
      origin: "send-email-logs.ts",
      createdAt: expect.any(Date),
    }); 
    expect(mockLogRepository.getLogs).toHaveBeenCalledTimes(0); 

  });
});