import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { FUNCTIONALITIES, MODULES, ROLES } from 'App/Domain/DictionaryAuthorization'

export default class extends BaseSeeder {
    public async run() {
        await this.assignModulesRoles()
        await this.assignPermissionsSuperUser()
    }

    private async assignModulesRoles() {
        await Database
            .table('roles_modules')
            .multiInsert([
                {
                id: 1,
                rol_id:  ROLES.ADMINISTRATOR,
                module_id: MODULES.USERS
                },
                {
                id: 2,
                rol_id:  ROLES.ADMINISTRATOR,
                module_id: MODULES.ANALYZE
                },
                {
                id: 3,
                rol_id:  ROLES.ADMINISTRATOR,
                module_id: MODULES.MANAGE
                },
                {
                id: 4,
                rol_id:  ROLES.ADMINISTRATOR,
                module_id: MODULES.VALIDATE
                },
                {
                id: 5,
                rol_id:  ROLES.PROJECT,
                module_id: MODULES.ANALYZE
                },
                {
                id: 6,
                rol_id:  ROLES.PROJECT,
                module_id: MODULES.MANAGE
                },
                {
                id: 7,
                rol_id:  ROLES.PROJECT,
                module_id: MODULES.VALIDATE
                }
                
            ])
    }

    private async assignPermissionsSuperUser(){
        await Database
            .table('roles_modules_functionalities')
            .multiInsert([
                {
                    
                    rol_module_id: 1,                    
                    functionality_id: FUNCTIONALITIES.CREATE,
                },
                {
                   
                    rol_module_id: 1,                    
                    functionality_id: FUNCTIONALITIES.READ,
                },
                {
                   
                    rol_module_id: 1,                    
                    functionality_id: FUNCTIONALITIES.UPDATE,
                },
                {
                   
                    rol_module_id: 1,                    
                    functionality_id: FUNCTIONALITIES.DELETE,
                },
                
            ])
    }

 
}
