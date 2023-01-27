import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Region } from './region';
import { Pais } from './pais';
import { HttpRequest } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(http : HttpClient,router : Router) {
    this.http = http;
    this.router = router;
  }


/* //SIN PAGINADOR
  public getUsuarios() : Observable<Usuario[]>{

    return this.http.get(this.urlEndPoint).pipe(

      tap(response => {
        let usuarios = response as Usuario[];
        console.log('UsuarioService : tap 1');
        usuarios.forEach(usuario => {
          console.log(usuario.nombre);
        })
      }),

      map(response => {
        let usuarios = response as Usuario[];
        return usuarios.map(usuario => {
          usuario.nombre = usuario.nombre.toUpperCase();
          usuario.apellido = usuario.apellido.toUpperCase();
          usuario.email = usuario.email.toUpperCase();
          //usuario.number
          //usuario.edad
          //usuario.region
          //usuario.pais
          usuario.createAt = formatDate(usuario.createAt, 'dd-MM-yyyy', 'en-US');
          return usuario;
        });
      }),

      tap(response => {
        console.log('UsuarioService : tap 2');
        response.forEach(usuario => {
          console.log(usuario.nombre);
        })
      }),

    );
  }
*/


  public getUsuariosPage(page:number) : Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
            //CAST A ANY
      tap((response : any)  => {
        console.log('UsuarioService : tap 1');
        (response.content as Usuario[]).forEach(usuario => {
          console.log(usuario.nombre);
        })
      }),

      map((response : any) => {
         (response.content as Usuario[]).map(usuario => {
           usuario.nombre = usuario.nombre.toUpperCase();
           usuario.apellido = usuario.apellido.toUpperCase();
           usuario.email = usuario.email.toUpperCase();
           //usuario.number
           //usuario.edad
           //usuario.region
           //usuario.pais
           usuario.createAt = formatDate(usuario.createAt, 'dd-MM-yyyy', 'en-US');
          return usuario;
        });
        return response;
      }),

      tap(response => {
        console.log('UsuarioService : tap 2');
        (response.content as Usuario[]).forEach(usuario => {
          console.log(usuario.nombre);
        })
      }),

    );
  }


  public getUsuario(id) : Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`)
    .pipe(catchError(e => {
      this.router.navigate(['/usuarios']);
      console.error(e.error.mensaje);
      //swal.fire('Error al editar', e.error.mensaje, 'error');
      return throwError(e);
    }));
}


  public create(usuario : Usuario) : Observable<Usuario> {
    return this.http.post(this.urlEndPoint, usuario, {headers : this.httpHeaders})
    .pipe(
      map((response : any) => response.usuario as Usuario),
      catchError( e => {
        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
    }));
  }


  public getRegiones() : Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  public getPaises() : Observable<Pais[]>{
    return this.http.get<Pais[]>(this.urlEndPoint + '/paises');
  }


  public update(usuario : Usuario) : Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.id}`, usuario)
    .pipe(catchError( e => {
      //MANEJANDO EL ERROR Q VIENE DESDE LA VALIDACIÓN DE SPRING
      if(e.status==400){
        return throwError(e);
      }
      if(e.error.mensaje){
        console.error(e.error.mensaje);
      }
      return throwError(e);
    }));
  }

  public delete(id : number) : Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`)
    .pipe(catchError( e => {
      if(e.error.mensaje){
        console.error(e.error.mensaje);
      }
      return throwError(e);
    }));
  }


  subirFoto(archivo : File, id) : Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`,formData, {
      reportProgress: true,
    });
    return this.http.request(req);
  }




  private http : HttpClient;
  private urlEndPoint : string = 'http://localhost:8080/api/user';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})
  private router : Router;
  regiones : Region[];
}
