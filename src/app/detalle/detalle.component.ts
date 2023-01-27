import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuarios/usuario.service';
import { ActivatedRoute } from '@angular/router'; //SE USA PARA SUSCRIBIR CUANDO CAMBIA EL PARÁMETRO DEL ID.
import { Usuario } from '../usuarios/usuario';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  constructor(usuarioService : UsuarioService,  activatedRoute : ActivatedRoute) {
    this.usuarioService = usuarioService;
    this.activatedRoute = activatedRoute;
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


  title : string = "User Detail";
  usuario : Usuario;
  private usuarioService : UsuarioService;
  private activatedRoute : ActivatedRoute;
  fotoSeleccionada : File;
  progreso : Number = 0;
}
