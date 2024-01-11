interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

class CheckService implements CheckServiceUseCase {
  public async execute(url: string): Promise<boolean> {
    try {

      const request = await fetch( url );

      if (!request.ok) {
        throw new Error(`Error on check service: ${url}`);
      }

      const date = new Date().toLocaleString('en-US', { timeZone: 'America/Vancouver' });

      console.log(`[${date}] - (${url}) is ok!`);

      return true;

    } catch (error) {

      console.log(error);

      return false

    }
  }
}

export default CheckService;