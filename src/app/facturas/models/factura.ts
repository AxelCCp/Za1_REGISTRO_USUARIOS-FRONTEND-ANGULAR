import { Usuario } from "src/app/usuarios/usuario";
import { Itemfactura } from './itemfactura';

export class Factura {

    calculargranTotal() : number {
        this.total = 0;
        this.items.forEach((item:Itemfactura) => {
          this.total = this.total + item.calcularImporte();
        });
        return this.total;
      }

    id : number;
    descripcion : string;
    observacion : string;
    items : Array<Itemfactura> = [];
    usuario : Usuario;
    total : number;
    createAt : string;

  
}
