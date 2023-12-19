import { UpdateRolDto } from '../dto/update-rol.dto';
import { Rol } from '../rol.entity';

export interface IRolRepository {
  addRol(rol: Rol): Promise<Rol>;
  getAllRol(): Promise<Rol[]>;
  getOneRol(id: number): Promise<Rol>;
  updateRol(id: number, changes: UpdateRolDto): Promise<Rol>;
  deleteRol(id: number): Promise<Rol>;
}
