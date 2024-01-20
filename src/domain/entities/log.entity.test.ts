import LogEntity, { LogSeverityLevel } from "./log.entity";

describe('Test *', () => {

  const object = {
    message: 'Test message',
    level: LogSeverityLevel.LOW,
    origin: 'log.data-source.test.ts',
  };

  const log = new LogEntity(object);

  test('Should be instance of LogEntity', () => {
    expect(log).toBeInstanceOf(LogEntity);
  });

  test('LogEntity instance should contains requested properties', () => {
    expect(log).toEqual(expect.objectContaining({
      level: object.level,
      origin: object.origin,
      message: object.message,
      createdAt: expect.any(Date),
    }));
  });

  test('Should return instance of LogEntity with provided JSON', () => {
    const jsonTest = '{"level":"low","message":"Service http://localhost:3005 is working","origin":"check-service.ts","createdAt":"2018-01-01T02:05:30.225Z"}';

    const log = LogEntity.fromJSON(jsonTest);

    expect(log).toEqual(expect.objectContaining({
      message: "Service http://localhost:3005 is working",
      level: LogSeverityLevel.LOW,
      origin: 'check-service.ts',
      createdAt: expect.any(Date),
    }));
  });

  test('Should return instance of LogEntity with provided Object', () => {
    const log = LogEntity.fromObject(object);

    expect(log).toEqual(expect.objectContaining({
      message: object.message,
      level: object.level,
      origin: object.origin,
      createdAt: expect.any(Date),
    }));
  });

  test('Should Generate Date from private method generateDate()', () => {
    class TestExtend extends LogEntity {
      constructor(
        level: LogSeverityLevel,
        message: string,
        origin: string,
        createdAt: Date
      ) {
        super( { level, message, origin, createdAt } );
      }
      generateDateTest(): Date {
        return this.generateDate();
      }
    }

    const log = new TestExtend(
      LogSeverityLevel.LOW,
      'Test message',
      'log.data-source.test.ts',
      new Date()
    );

    const date = log.generateDateTest();

    expect(date).toBeInstanceOf(Date);
  });

});