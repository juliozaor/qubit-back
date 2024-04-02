/* eslint-disable @typescript-eslint/semi */

export class GeneratePassword{

  public async generatePassword (text: string, length: number): Promise<string> {
    let temporaryPassword = '';
    for (let i = 0; i < length; i++){
      let random = Math.floor(Math.random() * text.length)
      temporaryPassword += text.charAt(random);
    }

    return temporaryPassword;
  }

  public async generate (): Promise<string> {
    let base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '123456789';
    const symbols = '.?-_+!¡¿*%#$/()[]{}|@<>';

    let password = await this.generatePassword(`${base}${numbers}${symbols}`, 12);
    return password
  }
}
