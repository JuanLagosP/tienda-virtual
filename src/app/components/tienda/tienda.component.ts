import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  productos: any[] = [];
  numProductos: number;
  flag: boolean  = false;

  constructor(private _productosService: ProductosService, private _router: Router) {
    this.productos = this._productosService.getProductos();
    this.numProductos = Array.from(this._productosService.getCarrito().values()).reduce((a, b) => a + b, 0);
  }

  admin(): void {
    this._router.navigate(['/admin'])
  }

  carrito(): void {
    this._router.navigate(['/carrito']);
  }

  agregarAlCarrito(producto: any): void {
    this._productosService.agregarAlCarrito(producto);
    this.numProductos = Array.from(this._productosService.getCarrito().values()).reduce((a, b) => a + b, 0);
    alert('¡Producto agregado con éxito!');
  }

  ngOnInit(): void {
  }

}
