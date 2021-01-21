import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = 'http://localhost:8080/categoria';

  constructor(private http: AuthHttp) {}

  //lista as categorias coletadas na API
  listarCategorias(): Promise<any> {

    //const headers = new Headers();
    //headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.categoriaUrl)
    .toPromise()
    .then(response => response.json());

  }

}
