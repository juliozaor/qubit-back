import { Rol } from "../Data/Entities/Authorization/Rol";

export interface RepositoryAuth {
    getRoleWithModulesAndPermissions(idRol: number): Promise<Rol>
}