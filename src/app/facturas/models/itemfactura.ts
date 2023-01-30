import { Producto } from './producto';

export class Itemfactura {

    public calcularImporte() : number {
      return this.cantidad * this.producto.precio;
    }


    producto : Producto;
    cantidad : number = 1;
    importe : number;
}
