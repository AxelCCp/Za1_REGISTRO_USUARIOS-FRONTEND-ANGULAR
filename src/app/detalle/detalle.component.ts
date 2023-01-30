import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuarios/usuario.service';
import { ActivatedRoute } from '@angular/router'; //SE USA PARA SUSCRIBIR CUANDO CAMBIA EL PARÁMETRO DEL ID.
import { Usuario } from '../usuarios/usuario';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { Input } from '@angular/core';
import { FacturasService } from '../facturas/services/facturas.service';
import { Factura } from '../facturas/models/factura';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  constructor(usuarioService : UsuarioService,  activatedRoute : ActivatedRoute, facturasService : FacturasService) {
    this.usuarioService = usuarioService;
    this.activatedRoute = activatedRoute;
    this.facturasService = facturasService;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
    let id : number = +params.get('id');
      if(id){
        this.usuarioService.getUsuario(id).subscribe(usuario => {
          this.usuario = usuario;
        });
      }
    });
  }



  seleccionarFoto(event){
  this.fotoSeleccionada = event.target.files[0];
  // SE REINICIA EL PROGRESO POR SI SE QUIERE CAMBIAR LA FOTO.
  this.progreso = 0;
  console.log(this.fotoSeleccionada);
  // ESTO VALIDA Q EL ARCHIVO SUBIDO TENGA UN TYPE = IMAGE
  if(this.fotoSeleccionada.type.indexOf('image') < 0){
    swal.fire('Error seleccionar imagen:', 'el archivo debe ser del tipo imagen', 'error');
    this.fotoSeleccionada = null;
  }
}

subirFoto(){
  if(!this.fotoSeleccionada){
    swal.fire('Error upload:', 'debe seleccionar una foto', 'error');
  }else{
    this.usuarioService.subirFoto(this.fotoSeleccionada, this.usuario.id)
    .subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        this.progreso = Math.round((event.loaded/event.total)*100);
      }else if(event.type === HttpEventType.Response){
        let response : any = event.body;
        this.usuario = response.usuario as Usuario;
        //_notificarUpload : LOS PARENTESIS NO SE USAN EN UN GETTER. ESTA LÍNEA EMITE AL CLIENTE CON LA NUEVA FOTO, ESTO PARA ACTUALIZAR LA FOTO EN EL LISTADO DE CLIENTES.
        //EN EL CLIENTES COMPONENENT HAY Q SUSCRIBIRSE A ESTE EventEmitter. EN EL ONINIT()
        //this.modalService._notificarUpload.emit(this.cliente);

                                                         //ESTE VIENE DEL BACK
        swal.fire('La imagen se Ha subido correctamente!', response.mensaje, 'success');
      }
    });
  }
}


delete(factura : Factura) : void {

  const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });


  swalWithBootstrapButtons.fire({
    title: 'Está seguro?',
    text: `¿Seguro que desea eliminar la factura ${factura.descripcion} ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    //confirmButtonClass: 'btn btn-success',
    //cancelButtonClass: 'btn btn-danger',
    confirmButtonText: 'Sí, eliminar!',
    cancelButtonText: 'No, cancelar!',
    //buttonsStyling: false,
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.facturasService.delete(factura.id).subscribe(response => {
        //PARA ACTUALIZAR AUTOMÁTICAMENTE LA LISTA CON EL CLIENTE Q SE ELIMINÓ. SE USA FILTRO.
        this.usuario.facturas = this.usuario.facturas.filter(f => f !== factura);
        swalWithBootstrapButtons.fire(
          'Factura eliminada!',
          `Factura:  '${factura.descripcion}' eliminada con éxito!`,
          'success'
        )
      })
    }
  })
}


  title : string = "User Detail";
  @Input() usuario : Usuario;
  private usuarioService : UsuarioService;
  private activatedRoute : ActivatedRoute;
  fotoSeleccionada : File;
  progreso : Number = 0;
  facturasService : FacturasService;
}
