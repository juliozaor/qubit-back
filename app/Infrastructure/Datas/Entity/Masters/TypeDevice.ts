import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { TypeDevice } from 'App/Domain/Data/Entities/Masters/TypeDevice';

export default class TblTypeDevice extends BaseModel {
  public static readonly table = 'device_types';

  @column({ isPrimary: true })
  public id?: number;

  @column()
  public name: string;

  public updateTypeDevice (typeDevice: TypeDevice) {
    this.id = typeDevice.id
    this.name = typeDevice.name
  }

  public setTypeDevice (typeDevice: TypeDevice) {
    this.id = typeDevice.id
    this.name = typeDevice.name
  }

  public getTypeDevice(): TypeDevice {
    const typeDevice = new TypeDevice();
    typeDevice.id = this.id
    typeDevice.name = this.name
    return typeDevice;
  }
  
}