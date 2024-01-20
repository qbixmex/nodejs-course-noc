import fs from 'node:fs';
import path from 'node:path';
import FileSystemDataSource from './file-system.datasource';

describe('Test on File System Datasource', () => {

  const logPath = path.join(__dirname, '../../../logs');

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test('Should create log files if they do not already exist.', () => {
    new FileSystemDataSource();
    const files = fs.readdirSync(logPath);

    expect(files).toEqual([
      'all-logs.log',
      'high-logs.log',
      'medium-logs.log',
    ]);
  });
});