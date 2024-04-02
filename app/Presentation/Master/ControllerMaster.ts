/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TblTypeDevice from 'App/Infrastructure/Datas/Entity/Masters/TypeDevice';
import TblProjectStatus from 'App/Infrastructure/Datas/Entity/PojectStatus';
import TblStatus from 'App/Infrastructure/Datas/Entity/Status';
import TblTypeApplication from 'App/Infrastructure/Datas/Entity/TypeApplications';
import TblTypeItem from 'App/Infrastructure/Datas/Entity/TypeItems';
import TblTypeProject from 'App/Infrastructure/Datas/Entity/TypeProject';
import TblTypeUnit from 'App/Infrastructure/Datas/Entity/TypeUnits';

export default class ControllerMaster {
  constructor () {
  }


  public async getStatus ({response}:HttpContextContract){
     const status = await TblStatus.all()
      return response.status(200).send({status});
  }

  public async getTypeApplications ({response}:HttpContextContract){
    const typeApplication = await TblTypeApplication.all()
     return response.status(200).send({typeApplication});
 }

 public async getTypeDevices ({response}:HttpContextContract){
  const typeDevice = await TblTypeDevice.all()
   return response.status(200).send({typeDevice});
}

public async getTypeItems ({response}:HttpContextContract){
  const typeItem = await TblTypeItem.all()
   return response.status(200).send({typeItem});
}

public async getTypeProjects ({response}:HttpContextContract){
  const typeProject = await TblTypeProject.all()
   return response.status(200).send({typeProject});
}

public async getTypeUnits ({response}:HttpContextContract){
  const typeUnit = await TblTypeUnit.all()
   return response.status(200).send({typeUnit});
}

public async getprojectStatus ({response}:HttpContextContract){
  const projectStatus = await TblProjectStatus.all()
   return response.status(200).send({projectStatus});
}

}
