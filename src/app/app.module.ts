import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LanguagesComponent } from './languages/languages.component';

import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioService } from './usuarios/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FormComponent } from './usuarios/form.component';    //PARA CONECTARME AL BACK.
import { FormsModule } from '@angular/forms';
import { FacturasComponent } from './facturas/facturas.component';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';  //CLASE 180
import {MatInputModule} from '@angular/material/input';                //CLASE 180
import {MatFormFieldModule} from '@angular/material/form-field';       //CLASE 180
import { ReactiveFormsModule } from '@angular/forms';                  //CLASE 180


const routes : Routes = [
  {path:'languajes', component:LanguagesComponent},
  {path:'usuarios', component:UsuariosComponent},
  {path:'usuarios/page/:page', component:UsuariosComponent},
  {path:'usuarios/ver/:id', component:DetalleComponent},
  {path:'usuarios/form', component:FormComponent},
  {path:'usuarios/form/:id', component:FormComponent},
  {path:'facturas/:id', component:DetalleFacturaComponent},
  {path:'facturas/form/:usuarioId', component:FacturasComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LanguagesComponent,
    UsuariosComponent,
    PaginatorComponent,
    DetalleComponent,
    FormComponent,
    FacturasComponent,
    DetalleFacturaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
