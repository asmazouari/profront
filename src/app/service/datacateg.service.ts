import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatacategService {

  constructor(private httpClient:HttpClient) { }

  getData(){
    return this.httpClient.get('http://127.0.0.1:8000/api/categories');
    }
  
    deleteData(id:any){
      return this.httpClient.delete('http://127.0.0.1:8000/api/deleteCategorie/'+id);
      }
}
