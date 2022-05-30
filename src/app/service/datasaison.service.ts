import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasaisonService {
  constructor(private httpClient:HttpClient) { }
 
  getData(){
    return this.httpClient.get('http://127.0.0.1:8000/api/saisons');
  }
  deletetData(id:any){
    return this.httpClient.delete('http://127.0.0.1:8000/api/deletesaison/'+id);
  }

  updateSaison(id:any,data:any){
    return this.httpClient.put('http://127.0.0.1:8000/api/updatesaison/'+id,data);
  }

  geSaisonById(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/saison/'+id);
  }
}
