import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatatailleService {

  constructor(private httpClient:HttpClient) { }

  getData(){
    return this.httpClient.get<any[]>('http://127.0.0.1:8000/api/tailles');
  }
  deletetData(id:any){
    return this.httpClient.delete('http://127.0.0.1:8000/api/deleteTaille/'+id);
  }

  updateTaille(id:any,data:any){
    return this.httpClient.put('http://127.0.0.1:8000/api/updateTaille/'+id,data);
  }

  geTailleById(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/taille/'+id);
  }
}
