import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  constructor(private _productosService: ProductosService, private _router: Router) {
  }

  ngOnInit(): void {
    this._router.navigate(['/admin']);
  }

  tienda(): void {
    this._router.navigate(['/tienda']);
  }

  carrito(): void {
    this._router.navigate(['/carrito']);
  }

}
