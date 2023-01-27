import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { tap } from 'rxjs/operators';
import { Usuario } from './usuario';
import { ActivatedRoute } from '@angular/router';  //PARA ACTIVAR EL PATH VARIABLE DE LA PAGINACIÓN
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(usuarioService : UsuarioService, activatedRoute : ActivatedRoute) {
    this.usuarioService = usuarioService;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {

      /*
      this.usuarioService.getUsuarios().pipe(
        tap(usuarios => {
          console.log('UsuariosComponent : tap 3');
          usuarios.forEach(usuario => {
            console.log(usuario.nombre);
          });
        })
      ).subscribe((usuarios) => {
          this.usuarios = usuarios;
        });
      */

        this.activatedRoute.paramMap.subscribe(params => {
        //EL + COMBIERTE ESTE STRING "params.get('page')" EN UN ENTERO.
        let page : number = +params.get('page');

        //SI PAGE NO ESTÁ DEFINIDO
        if(!page){
          page = 0;
        }
        this.usuarioService.getUsuariosPage(page)
        .pipe(
          tap(response => {
            console.log('UsuariosComponent : tap 3');
            (response.content as Usuario[]).forEach(usuario => console.log(usuario.nombre));
          })
        ).subscribe(response => {
          this.usuarios = response.content as Usuario[];
          this.paginador = response;
        });
    });
  }


  public delete(usuario : Usuario) : void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${usuario.nombre} ${usuario.apellido} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(usuario.id).subscribe(response => {
          //PARA ACTUALIZAR AUTOMÁTICAMENTE LA LISTA CON EL CLIENTE Q SE ELIMINÓ. SE USA FILTRO.
          this.usuarios = this.usuarios.filter(cli => cli !== usuario);
          swalWithBootstrapButtons.fire(
            'Cliente eliminado!',
            `Cliente ${usuario.nombre} ${usuario.apellido} eliminado con éxito!`,
            'success'
          )
        })
      }
    })
  }



private usuarioService : UsuarioService;
usuarios : Usuario[];
private activatedRoute : ActivatedRoute;
paginador : any;


}
