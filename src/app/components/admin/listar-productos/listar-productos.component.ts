import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit, OnDestroy {
  //subscription: Subscription;
  productos: any[] = [];

  constructor(private _productosService: ProductosService) {
    /*
    this.subscription = this._productosService.getProductos().subscribe(
      producto => {
        this.productos.push(producto)    
      }
    );
    */

    /*
    this.subscription = this._productosService.getProdModificado().subscribe(
      pMod => {
        this.productos.forEach(producto => {
          if (producto.id === pMod.id) {
            producto.descripcion = pMod.descripcion;
            producto.precio = pMod.precio;
            producto.disponibilidad = pMod.disponibilidad;
          }
        })
      }
    );
    */
  }

  eliminar(id: number) {
    if (confirm('¿Está seguro de eliminar el producto?')) {
      this._productosService.eliminarProducto(id);
      this._productosService.actualizarID(id);
    }
  }
  
  ngOnInit(): void {
    this.productos = this._productosService.getProductos();
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
  
  seleccionar(producto: any) {
    this._productosService.seleccionarProducto(producto);
  }
  
}
