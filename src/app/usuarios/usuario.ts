import { Region } from './region';
import { Pais } from './pais';

export class Usuario {
  id : number;
  nombre : string;
  apellido : string;
  email : string;
  number : string;
  edad : number;
  region : Region;
  pais : Pais;
  createAt : string;
  foto : string;

}
