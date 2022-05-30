import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatacouleurService {

  constructor(private httpClient:HttpClient) { }
 
  getData(){
    return this.httpClient.get<any[]>('http://127.0.0.1:8000/api/couleurs');
  }
  deletetData(id:any){
    return this.httpClient.delete('http://127.0.0.1:8000/api/deleteCouleur/'+id);
  }

  updateCouleur(id:any,data:any){
    return this.httpClient.put('http://127.0.0.1:8000/api/updateCouleur/'+id,data);
  }

  geCouleurById(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/couleur/'+id);
  }
}
