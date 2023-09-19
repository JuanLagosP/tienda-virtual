import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  // $ indica que es un observable
  private productos: any[] = [
    {id: 1, descripcion: 'MacBook Air', precio: 12000, disponibilidad: 10, 
    url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIRERERERERERERDxEPDxIREhERDxEPGBQZGRgUGBgcIS4lHB4rHxgYJjgmKz0xNTU1GiQ7QDszQy40NTEBDAwMEA8QGhISHjQhISE0MTQ0NDQxNDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDE0NDQxNDQxNDQxNDQ0NDQxNDQ0NDQ0NP/AABEIAKwBJgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBgcEBQj/xABOEAABAgMCBgsNBgQEBwAAAAABAAIDBBEFEhYhMVSR0QYHFEFRU2F0k6GyExUyNDVxc4GSlLGz0iIjM1JywiRChMFDYmThFyVEgqKj8P/EABsBAAIDAQEBAAAAAAAAAAAAAAADAQIEBQYH/8QAMBEAAgECBAQFBAICAwAAAAAAAAECAxEEFCFREjFhkQUTcaGxMjNBgSLwUqIGFSP/2gAMAwEAAhEDEQA/ANmQhCABZ7tq7MYlmwYcKXIbMTF4h5ANyG2gJA4TkrvLQlhW36f4uT5q75hQBRImy60XGrp6ZJOU90cmYU2hnsz0rta9mT2KwYkKHELooL4TYhALaAkA0GLlXRgfL/njaWakHRj4ViWk0lr1K9hTaGeTPSuRhTaGeTPSuVgwQl/zxtLNSBsPl/zxtLB/ZBP/AFOJ2Xcr+FNoZ5M9I5GFVoZ7MdK9WeFsQkj4b5sfpfBPxaF2Qdg1nvyTMwOR7oLBpu0V4w4uTXcx1sNiKOs6UrbpcS/1uUzCm0M9mOlejCq0M9mOler3/wAOZPjpnko6D9CadrmV42Z9qF9CdlKv9Zzs7R39ijYU2hnkz0jkYU2hnkz0rldztdyvGzPtQvoSf8PJXjZn2oX0IylTp3JzlLr2KThVaGezHSvRhTaGeTPSOV1O17K8bM6Yf0Jp2ASvGzHtQvoRlKnTuGcpdexTMKbQz2Z6V2tGFNoZ5M9I5XE7AZXjZj2of0JDsBluMmPah/QjKVOncM5S69innZRaGXdsz0jtaMKrQz2Y6V6tx2ByvGTHtQ/oTTsFluMj+1D+lGUq9O4Zyl17FTwptDPZnpXa0YU2hnsz0rtatR2Dy3GR9MP6E07CZfjY+mH9KMpU6dyM7R69irYU2hnsz0r9aXCq0M9mOlerKdhcvxkf2of0pp2Gy/GR/ah/SpydXp3DO0evYrmFNoZ7M9K9GFNoZ7M9K7WrDgfL8ZH9qH9KbgjL8ZG0w/pRk6vTuRnqPXseBhTaGeTPSORhTaGezPSvXuYJwPzxtMP6Uh2KQPzxvah/SpyVXp3DP0evY8TCm0M8mekcjCm0M8melfrXsYLwPzxvaZ9KadjEH88XSz6UZKt07hnqPXseThTaGeTPSORhTaGeTPSOXqHY1B/PG0s+lIdjcH80bS36UZKt07hnqO77HNIbNrTgPa9k5GNDW69xfDdyFpyhfRew23haMlCmroa51WxGjGGxGmjgPj61822xZLIENr2OcSXhpvFpFC1x3gOBbVtHH/lLuScjAezDWepTlTlwy5mmnUjUjxR5GjIQhULghCEACEIQALCdv3xyT5q75jluywnb98ck+au+Y5AEtjwqyssf9ND7AXUYSZYY/hJXm8LsBdpasLqNSZ7Ok/8Azj6L4RxliS6ussTHQ0yNS425zFibcXSWJLivxFlIjhRns8FzhyVI/wBiu2DaZyOAPK3E7UepctxFxXhXnT+lmTE4HDYr70FJ78n3Wp68OO1+Q4/ykgO0D+yHLxwOBdMKbOR2Plyu07/rW+j4hF6VNOq5HmMb/wAanBOeFlxL/F2v+non+7Pa52l6S+Ey+CKg1GkpjiukmmrrkeYlGUJOMlZrmno0SnGmEKIlMMQ8J0osVJi1NLVCYjuFIY55CgCQs5Uww+XqTe7jfxfBBcpIGuhHhCicwje/upS9N7op1KnM5Mcup5Byj176hdD4DXkOVSmRY5yo3KR4UblJAxyjKkco3KQGFNKcU0oA8XZP+A307ew9a1tG+Snc8jdmGsk2T/gN9O3sPWt7Rvkp3PI3ZhrkY37z9EdrA/ZXqzRkIQshsBCEIAEIQgAWE7fvjknzV3zHLdlhO3745J81d8xyAZPYMUbllhwS8If+IXpAqsWTHLYMv6GH8F7kvMVWGpTabZ7iNJqnB9F8HZRIQhrk9KTKjLqLqekor8QEdxIWqWiKI4guQ3Uhap7qaWqOIniIWktNRkXdKQTG8Atv0qWE3SRwtriOnF1rmLVHUtIc0kEEEEGhBG+Fpw+LnRenLY5/iHhlDGx/mrTXKS5+j3XxzVjrjycRnhw3NHDSrfaGJchKsVm7IGmjY4ocndGjEf1DePKMXIF7Ql4UZt4dzitP8wuxBpXZpY2E1oeLxPhNXDytPTr+H6P+soLk1wV6dY0E/wCE0eYXfgo+80Him+up+JTcxEzZOe69yiuCiqRkWgiyoI/wYfRt1JHWXCOWDCPnhs1IzEdgyctzPzFPImGKeDrV5mbBl3j8O4d4wyWkerwdIVfntjUVhJh0iN3hVrHjz1ND56+pMjWixU8NOOvM8Xu3nSiJyp01JRYdS+HEYBlc5jrntZFyFNTuZ3Fo679ctD51G5gOTF1hQXiN/SlERSVsK6Hyj4KJzCpS9NLlNwsQlh/+ooy0qYlMKkLHg7J/wG+nb2HrWto3yS7nkbssWT7K/wABnp29ly1jaO8knnkbssXIxv3f0jtYH7K9WaMhCFkNYIQhAAhCEACwrb98ck+au+YVuqwrb98bk+au+YUEPkeRIn7mD6CH8F2QYxaVxyI+4geih/BTqso3R9HoNSpQ9F8HuS8xVdbXKuwI10r15ePVYqlOzM9Wlbkd9UoULXp4elXM9iSiKJocnhRcqJRCVIi4DXNUbmqdMc1TcLnO5qWHFcx15rnNPC1xY6nBUY1IWphai5e99D05XZFMM8K7FH+cfapwBwppNV7cjshgxCGurCcd55FwngD9dFTyE0hNjXqL83MdXw7D1OUeF9NPbkaU1zSndzVEs61Xw6NcS5mQb7mebhHJo4FYIVoOoHNdUHIRjBTs7w/UjjVvDJQdrnsugqN0BcrLWcMrQ7qXQy1oR8IOb6g4dSdHH0Xzlb1MM8FWX4v6DXQF49obHoEWpudzf+eHRhJ5RkPnpXlVhbNQXZIjR+r7HaopO5BwqCCOEEELXTxClrF39GjJUovlNd0ZpPbGI8Oph3Yzf8tGP9bSfgSvEmIT2Gj2PYeB7XMPWtidLcihfLb29wby1RxW5jnhIv6XYx2qW8tVi2VCd4cGE79UNjj1hckXY/LOyy7B+msPskJyxMdhTwb/AAzM7yQlX2PsSlneCIjP0xCe3eXmTWw1wqYUVp4GvaWH2m1roCYq8GKeFqLlqZ1sr/AZ6Ydh61jaO8knnkbssWYbN5CLAhMbFhuYTGbQnG132H5HDEVqG0d5JPPI3ZYubjGnV02R08EmqVnuzRUIQspqBCEIAEIQgAWFbf3jcnzV/wAwrdVhW3943J81f8woA8uzfwIPoWdlTlq57LP3EH0MPshdia4aHscJiP4RXRfBAQpYUYtSEJhakTgdWNSMlqenBmwd9dLYy8HGpWR3BZZUikqKfI99kVTNiKvtmyFOyf4Ul02KeHf4PdDk4FeXDtBvCuqHMh2Qpbi1zESpSR1UQQmtenVUCmRuamEKchMLVIJkJCaQpSE1wRcYmQkKSDHew1a4jhGUHzgprgm0Q9SzSejPTg2sf52g8rTTqOtd0GehuxB108DvsnUVX0oSZUYvloZ5YaD5aFpLU0ChqKg8IxHSvClZx7MQNW/kd4Pq4F7UtMsiD7Jod9p8IaxyrJUpOGvuZalOUOfI62TsVuSIT56O+NV0w7YePCYx/mq0/wBwuK6i4rQxVaHKb73+bmSVClL6or4+D1WWrDd4QczzirerH1LpYWPxscHcN0gkecbyr5Ym3aGoxEZCMoW2n4rVj9SUvZ+2nsZp+H0pfS2vcsLoSidDXmwbSiNxE90bwO8L2sumq9GBaEN+Im67gfi0HIupQ8QpVdL2ez/tvcwVcFUp62ut1/bme7crKWfB58z5MVe7tH+Sf6uN2WLyduxtLOgc+Z8mKvX2j/JP9XG+DE+p9QqPI0RCEKhYEIQgAQhCABYVt++NyfNXfMK3VYVt++NSfNn/ADEAePZh+4g+iZ8AuwFefZp+5g+iZ8Au0Fa7aI7eHqWS/Q+qEgKKqridalVAhNIT0JMqZthVI7qLqkoi6lSpmiNQiTmuIyHHyYk+6m3UtwY1SR0QbQe3fqOB2PrXoS9qtNA4EHhytXjFqLqVKimLnRpz5otkOKHCoIIOQg1CcqpBjvYatJB5DiPnG+vTlbX3nt/7m5PWNSTKlJcjFUwk46x1R6rgmEJWRQ4VaQQd8YwhyUIQxwUZCkKaVAxDEoQkQWHhSNO+MRGMUxEKEFOa5QVaPQg2g9uUhw/zCvWMa7IVqD+Znraa9RXjApwckSowf4M8qEH+CzQojXirTUdYPAQnELwJWZLHVHmI3iOBe3Cm2OFQ4DhDiGkLNOk4vTVGGrSlB7oHNUbmqUxWfnZ7TVE+Izee32gl2exEWUfbSedxQm1N3dbSG1N0HucTHRW/aQ8k/wBXG+DFT9tSm44VKeNtyY/8OIrjtIeSBzqN8Grv+H/YXqzlY37z9EaGhCFtMgIQhAAhCEACwvb+8ak+bP7a3RYZt/eNSXNn/MQBX7NP3ML0TPgF1grjs4/cwvRM+AXUCtyWiOjSnZIlBTgVCCngosb6dQkqgFNqlBVWjXGqPCcowU8FUcTTCsLRF1KhU4R6rDS1NLVIkVeAYqxGQkLVKQmkKrpjY1QgxnMNQSOEbx84XowLUBxOGPhGNv8AsvNokLUidBSCShU+rmWFsYOFQQRyIJXgw3ubkJC64c6f5h6wss6ElyEyotctT0klVztmQd9O7qEnhZThaJapQVH3QJQ9RYLEoKcHKEOTgVWxVonDk4RFz3khiKLFeC51iKpGxV53dE9sVQ4g6Z4W2S+spD5y35b1fNpHyQOdRvg1Z3tgOrKQuct7D1om0j5IHOo37V0sKrUv2zy/iatiGuiNDQhC0GAEIQgAQhCABYZt/eNSXNn9tbmsM2/vGpLmz+2gCt2cfuYXo2/ALqBXHZ5+6hejZ8AukFdCPJGmM9ESgpQVGCnAqbDo1SQFKCowUoKixojWJgU8FQApwcq2HRr2JgUt5RByLyrYasQS3kVUd9F5FhkcQSVRVMDkByOEbHEDwlomApwKq4D44gWiKIBTgqOmNVcApBEKYlS5UUxirju6FOEdRpKJUsOi6rRfM6WzKkEwuKiSiTLDl702dro6aYy5KFJjVPIsXUYnV3VKIy46pLyjyi/lo83Zs+sqwf6hvYctO2kfJA51G/aso2WurLN9O3suWsbSXkhvOo37VopK0bHjfGVbFyXRfBoSEITDlAhCEACEIQALDNv7xqS5s/trc1hm3941Jc2idtAFWkD91D9G3shdAcuKRd93D/QzshdIcujFaIX5pOCnAqFrk4OVrFlVJgUtVECnByBqqklUAplUtVFi6qj6p15RVS1UFvOJLyLyjqiqLFvPJQ5LeUVUtVFi6xBKHJwKgqlDkWHLEHQHJQ5c95ODlFh0cUdAelDlzhyL6jhGLFHTfReXPeS31HCXWLOiqWq5w9LfVXAbHFk6RRX068qOmPjjEPITS1JeS3kmVM0xxnU8PZYP4Zvp29hy1faS8kN51G/asn2XH+HZ6cdly1jaS8kDnUb9qqlbQ854tPjxLl0RoSEIQc0EIQgAQhCABYZt/eNSXN4nbC3NYjt8wi6ZkaYv4eLl/W3WgCkSZ+7Z+hnZC6A5eE10VoADwABQCgxDQnd0jcYNA1LWsRFJaGZ0ZN8z3WuUgcq/3WPxnUNSTu0fjeoalOZjsR5Mtyxgpwcq53eY43qGpJ3eY43qGpGYjsWVKe5ZLyLyre6Jjjeoaku6JjjeoakZmOxbgnuWS8lqq1uiY43qGpG6JjjeoakZiOxPBPcstUVVa3TMcb1DUjdMxxvUNSMxHYOGe5ZryW8qxumY43qGpdglrQuteBFLHNDmuay+C0ta8H7IOK69p9dMoIBmI7EqMl+T3LyLy8aLI2iwlrmRQQCT9i82gFcTwC04uA5cWXEoIrZxjGPeXNY+6WPLRddeYHtoab7TXTwFRmI7Fv57lhvovKrbqmON6hqRumY43qGpGYjsF57lpvpb6qu6Zjjeoaku6pnjuoakZiOxN5lpvJQ5VXdUzxvUNSTdUxxvUNSPPjsTxT3LZfRfVV3VM8d1DUjdUzx3UNSjz47E8cy1X04RFUt1zPHdQ1Jd1TPHdQ1I86OxZVZr8ltEROvqobrmeO6hqSbrmeO6hqVfNjsMWImj1tlTqwGemb2XLXdpLyQ3nUf9qweYfGiANiRLwBvAEb9KVxDlW9bSzKWS0f6mP1OASZNN6C5zc3dmgIQhVKAhCEAVOYj2vAc4mFCm4d4lhgPbCiNZXFeY8ZfMXLy5nZzGhVMWUiwAMpjB8NvnBcwAjlWgIQBmzdsa9jaIZ8z2n9q8TZFasraLobpqAXuhNe1hbHdDIa4gkG6BXwQtYmbOgxKh8Jjq5asaTpovKj7DLOeaulIJPDcbX4KQMj73WXmr/e4yTvdZebP98irVDsJs3NIWhGBFm5pD0IuBlne6zM2f73GSd7bMzZ/vcVapgRZuaQ9CMCLNzSHoQBlfe2zM2ie9xUve6y81f75F1LU8B7NzSHoRgPZuaQ9CgDLO91l5rE98jakve6y81i++RdS1LAezc0h6EYD2bmkPQgDLdwWVmr/fIupHe+y80ie+xdS1LAizc0h6EYD2bmkPQgDLtwWVmkT32NqUMOyrN7o8vhxRDNLjGRnucz7IBBcXC9jBPrpvLWMBbNzSHoSYD2bmkPQgDMBZdj8VM9MfrXZDFntaGNdPhgaGhomn3QwAgNAv0AoTiWiYC2bmkPQlwFszNIehSBnjnyBrV8+a5f4p+P8A9i540rZbwGvbOPa01aHTL3NaeQF+JaZgLZmaQtCTAazc0h6EXAy02VZHFTPTO+tQwrLs0PeXQYkSGQ3ubd0RGOYcdSSK1ri81OVaxgNZuaQ9CTAWzc0h6FAGW97rLzSJ75G1JO91l5rE98i6lqWBFm5pD0IwIs3NIehSBlve6y81ie+RdSO91l5rE98i6lqWA9m5pD0IwIs3NIehAGWd7bLzWJ77F1I722Zmr/e4q1PAezc0h6EYD2bmkPQoAyvvbZmaxPfIupHe2y82ie+RVqmA9m5pD0IwIs3NIehAGV97bMzZ/vcVKLNsvNn++RVqeBFm5pD0IwIs3NIehSBlne2y81f73F1Kz2JsphSMBsvLQgyE1z3AOi33XnOq4lzm1OMq24EWaP8ApIXshdctsSkIfgSsFvmYzUi4FTO2QAQCIdSQAO6NBJOQD7K9CW2XTcXFCkI8SoqHAObC9tzA3rVzl5ZjB9hrW4qfZa1vwCnUAViRbasVxdFMvLMu/ZhkCPFDqjwrtGgUrkJQrOhAH//Z'}
  ];
  private prodSeleccionado: any;
  private $productos = new BehaviorSubject<any[]>([]);
  private $prodSeleccionado = new Subject<any>();
  private $prodModificado = new Subject<any>();
  private $IDActualizado = new Subject<any>();

  constructor() { }

  agregarProducto(producto: any) {
    this.productos.push(producto);
  }

  getProductos(): any[] {
    return this.productos;
  }

  modificarProducto(producto: any) {
    this.productos.forEach(p => {
      if (p.id === producto.id) {
        p.descripcion = producto.descripcion;
        p.precio = producto.precio;
        p.disponibilidad = producto.disponibilidad;
        p.url = producto.url;
      }
    })
  }

  eliminarProducto(id: number) {
    this.productos.forEach(p => {
      if (p.id === id) {
        this.productos.splice(this.productos.indexOf(p), 1);
      }
    })
  }

  actualizarID(id: number) {
    this.productos.forEach(p => {if (p.id > id) p.id--});
  }

  /*
  seleccionarProducto(producto: any) {
    this.prodSeleccionado = producto;
  }

  getProdSeleccionado(): any {
    return this.prodSeleccionado;
  }
  */

  /*agregarProducto(producto: any) {
    // next() es el método que permite enviar un valor a través del observable
    this.$productos.next(producto);
  }

  getProductos(): Observable<any> {
    // asObservable() es el método que permite obtener el valor del observable
    return this.$productos.asObservable();
  }
  */

  seleccionarProducto(producto: any) {
    this.$prodSeleccionado.next(producto);
  }

  getProdSeleccionado(): Observable<any> {
    return this.$prodSeleccionado.asObservable();
  }
  
  /*
  modificarProducto(producto: any) {
    this.$prodModificado.next(producto);
  }

  getProdModificado(): Observable<any> {
    return this.$prodModificado.asObservable();
  }

  */

  getIDActualizado(): Observable<any> {
    return this.$IDActualizado.asObservable();
  }

  agregarAlCarrito(key: any, cont: number): void {
    console.log('Producto agregado con éxito')
    console.log(key.toString() + ' - cont: ' + cont);
  }
  
}
