import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { AgregarProductosComponent } from './components/admin/agregar-productos/agregar-productos.component';
import { ListarProductosComponent } from './components/admin/listar-productos/listar-productos.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { CarritoComponent } from './components/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AgregarProductosComponent,
    ListarProductosComponent,
    TiendaComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
