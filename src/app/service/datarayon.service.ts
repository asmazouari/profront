import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatarayonService {

  constructor(private httpClient:HttpClient) { }
 
  getData(){
    return this.httpClient.get('http://127.0.0.1:8000/api/rayons');
  }
  deletetData(id:any){
    return this.httpClient.delete('http://127.0.0.1:8000/api/deleteRayon/'+id);
  }

  updateRayon(id:any,data:any){
    return this.httpClient.put('http://127.0.0.1:8000/api/updateRayon/'+id,data);
  }

  geRayonById(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/rayon/'+id);
  }
}
