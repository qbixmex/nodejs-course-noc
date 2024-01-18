import { envs } from './envs.plugin';

describe('Tests on Environments Plugin', () => {
  test('Should match to object types', () => {
    expect(envs).toEqual({
      PORT: 3000,
      HOST: "http://localhost",
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: expect.stringContaining("@gmail.com"),
      MAILER_SECRET_KEY: expect.any(String),
      PRODUCTION: expect.any(Boolean),
      MONGO_URL: expect.stringContaining("mongodb://"),
      MONGO_DB_NAME: expect.any(String),
      MONGO_USER: expect.any(String),
      MONGO_PASSWORD: expect.any(String),
      POSTGRES_URL: expect.stringContaining("postgres://"),
      POSTGRES_DB: expect.any(String),
      POSTGRES_USER: expect.any(String),
      POSTGRES_PASSWORD: expect.any(String),
    });
  });

  test('Should return error if not found a valid port', async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import ("./envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }

  });
});
