import { Region } from './region';
import { Pais } from './pais';
import { Factura } from '../facturas/models/factura';

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
  facturas : Factura[] = [];

}
