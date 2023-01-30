import { Component, OnInit } from '@angular/core';
import { FacturasService } from './services/facturas.service';
import { Factura } from './models/factura';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {

  constructor(facturaService : FacturasService, activatedRoute : ActivatedRoute) {
    this.facturaService = facturaService;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.facturaService.getFactura(id).subscribe(factura => {
        this.factura = factura;
      })
    })

  }


private facturaService : FacturasService;
factura : Factura;
title : string = 'Invoice';
private activatedRoute : ActivatedRoute;

}
