import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[];
  total: number = 0;
  
  constructor(private _productosService: ProductosService, private _router: Router) { 
    this.carrito = Array.from(this._productosService.getCarrito().keys());
    this.total = this._productosService.getTotal();
  }

  tienda(): void {
    this._router.navigate(['/tienda']);
  }

  quitarDelCarrito(producto: any): void {
    if(confirm('¿Está seguro que desea quitar el producto del carrito?')) {
      this._productosService.quitarDelCarrito(producto);
      this.carrito = Array.from(this._productosService.getCarrito().keys());
      this.total = this._productosService.getTotal();
    }
  }

  getCantDeProducto(producto: any): number {
    console.log(this._productosService.getCantDeProducto(producto));
    return this._productosService.getCantDeProducto(producto);
  }

  // ¿Donde es mejor llamar a los metodos get, en el constructor o en ngOnInit?
  
  ngOnInit(): void {
  }
}
