import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataproductService {

  constructor( private httpClient: HttpClient) { }

  getData(){
    return this.httpClient.get<any[]>('http://127.0.0.1:8000/api/produits');
  }
  deletetData(id:any){
    return this.httpClient.delete('http://127.0.0.1:8000/api/deleteproduit/'+id);
  }

  updateProduct(id:any,data:any){
    return this.httpClient.put('http://127.0.0.1:8000/api/updateproduit/'+id,data);
  }

  geProducttById(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/produit/'+id);
  }
}
