import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css']
})
export class AgregarProductosComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  id: number = 1;
  descripcion: string;
  precio: number;
  disponibilidad: number;
  url: string;
  
  prodSeleccionado: boolean = false;
  formIncorrecto: boolean = false;
  textoIncorrecto: string = '';

  constructor (private _productosService: ProductosService) {
    this.subscription = this._productosService.getProdSeleccionado().subscribe(
      producto => {
        this.id = producto.id;
        this.descripcion = producto.descripcion;
        this.precio = producto.precio;
        this.disponibilidad = producto.disponibilidad;
        this.url = producto.url;
        this.prodSeleccionado = true;
      }
    )

    this.descripcion = '';
    this.precio = 0;
    this.disponibilidad = 0;
    this.url = '';
  }

  agregarProducto () {
    if (this.precio <= 0 || this.disponibilidad <= 0) {
      this.formIncorrecto = true;
      this.textoIncorrecto = 'Precio o Disponibilidad incorrecta: debe ser mayor a 0';
      return;
    }

    if (this.descripcion === '') {
      this.formIncorrecto = true;
      this.textoIncorrecto = 'Descripcion incorrecta: no puede estar vacia';
      return;
    } else {
      // Crear objeto producto
      const PRODUCTO = {
        id: this._productosService.getProductos().length + 1,
        descripcion: this.descripcion,
        precio: this.precio,
        disponibilidad: this.disponibilidad,
        url: this.url,
      }

      // Enviar objeto producto al servicio
      this._productosService.agregarProducto(PRODUCTO);

      // Limpiar formulario
      this.id++;
      this.descripcion = '';
      this.precio = 0;
      this.disponibilidad = 0;
      this.url = '';
    }
  }

  modificarProducto() {
    const PRODUCTO_MOD = {
      id: this.id,
      descripcion: this.descripcion,
      precio: this.precio,
      disponibilidad: this.disponibilidad,
      url: this.url,
    }

    this._productosService.modificarProducto(PRODUCTO_MOD);

    this.descripcion = '';
    this.precio = 0;
    this.disponibilidad = 0;
    this.prodSeleccionado = false;
    this.url = '';
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
