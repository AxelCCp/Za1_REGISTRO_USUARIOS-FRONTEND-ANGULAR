import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from './region';
import { Pais } from './pais';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(usuarioService : UsuarioService, router : Router, activatedRoute : ActivatedRoute) {
    this.usuarioService = usuarioService;
    this.router = router;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    this.cargarUsuario();
    this.usuarioService.getRegiones().subscribe(regiones => this.regiones = regiones);
    this.usuarioService.getPaises().subscribe(paises => this.paises = paises);
  }


  public cargarUsuario() : void {
    this.activatedRoute.params.subscribe(params => {  //EL 1ER SUBSCRIBE SE MANTIENE OBSERVANDO CUANDO LLEGUE UN ID.
      let id = params['id'];
      if(id){
        this.title = "Edit user";
        this.usuarioService.getUsuario(id).subscribe((usuario) => this.usuario = usuario);
      }else {
        this.title = "Create user";
      }
    });
  }

  public create() : void {
    this.usuarioService.create(this.usuario).subscribe(
      (usuario) => {
        this.router.navigate(['/usuarios'])
        console.log('123455678');
        //alert(`Usuario ${usuario.nombre} creado con éxito!`);
        swal.fire('Nuevo Usuario', `Usuario ${this.usuario.nombre} creado con éxito!`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];    //error : es un atributo json de err y errors es el q viene desde spring.
        console.error('Código del error desde el back : ' + err.status);
        console.error(err.error.errors);
      }
    );
  }


  public update() : void{
    console.log(this.usuario);
    this.usuarioService.update(this.usuario).subscribe(
      (json) => {
        this.router.navigate(['/usuarios']);
        swal.fire('Usuario actualizado', `Usuario ${json.userUpdated.nombre} actualizado con éxito!`, 'success');
    },
    err => {
      this.errores = err.error.errors as string[];    //error : es un atributo json de err y errors es el q viene desde spring.
      console.error('Código del error desde el back : ' + err.status);
      console.error(err.error.errors);
    }
  );
}
 

  compararRegion(obj1:Region, obj2:Region) : boolean {
    //SI NO ESTÁ DEFINIDA LA REGIÓN, EN EL CREAR CLIENTE, MARCA "--- Seleccionar una región ---"
    if(obj1 === undefined && obj2 === undefined){
      return true;
    }
    //SI AL COMPARAR, SON IGUALES, DEVUELVE TRUE, Y LO MUESTRA EN EL FORMULARIO.
    return obj1 === null || obj2 === null || obj1 === undefined || obj2 === undefined ? false : obj1.id === obj2.id;
  }

  compararPais(obj1:Pais, obj2:Pais) : boolean {
    //SI NO ESTÁ DEFINIDA LA REGIÓN, EN EL CREAR CLIENTE, MARCA "--- Seleccionar una región ---"
    if(obj1 === undefined && obj2 === undefined){
      return true;
    }
    //SI AL COMPARAR, SON IGUALES, DEVUELVE TRUE, Y LO MUESTRA EN EL FORMULARIO.
    return obj1 === null || obj2 === null || obj1 === undefined || obj2 === undefined ? false : obj1.id === obj2.id;
  }

  
  


title : string;
usuario : Usuario = new Usuario();
errores : string[];
private usuarioService : UsuarioService;
private router : Router;
private activatedRoute : ActivatedRoute;
regiones : Region[];
paises : Pais[];
}
