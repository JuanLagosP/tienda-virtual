import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit, OnDestroy {
  imagen: string = '';
  contProducto: number;
  productos: Map<any, boolean> = new Map();

  constructor(private _productosService: ProductosService, private _router: Router) {
    this.contProducto = 1;
  }

  incrementar(producto: any): void {
    if (this.contProducto >= 1 && this.contProducto < producto.disponibilidad) {
      this.contProducto++;
    }  
  }

  disminuir(producto: any): void {
    if (this.contProducto > 1 && this.contProducto <= producto.disponibilidad)
    this.contProducto--;
  }

  prodSeleccionado(producto: any): void {
    if (this.productos.get(producto) === false) {
      this.productos.set(producto, true);
    } else {
      this.productos.set(producto, false);
    }
  }

  getProductos(): any {
    return Array.from(this.productos.keys());
  }

  ngOnInit(): void {
    this._productosService.getProductos().forEach(producto => {
      this.productos.set(producto, false);
    });
  }

  ngOnDestroy(): void {
    /*
    this.subscription.unsubscribe();
    */
  }

  mostrarProd(): void {
    console.log(this.productos);
  }

  admin(): void {
    this._router.navigate(['/admin']);
  }

  carrito(): void {
    this._router.navigate(['/carrito']);
  }

  agregarAlCarrito(producto: any): void {
    this._productosService.agregarAlCarrito(producto, this.contProducto);
  }
}
