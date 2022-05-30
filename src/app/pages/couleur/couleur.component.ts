import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../@core/mock/smart-table.service';
import { DatacouleurService } from '../../service/datacouleur.service';
import { Couleur } from '../../Models/couleur';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-couleur',
  templateUrl: './couleur.component.html',
  styleUrls: ['./couleur.component.scss']
})
export class CouleurComponent  {
  settings = {
    actions:{position:'right' },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate : true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave : true,
    },
     delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      /*id: {
        title: 'ID',
        type: 'any',
        editable : false,
        addable: false
      },*/
      nom_couleur: {
        title: 'Couleur',
        type: 'any',
        width : '80%'
      },
    },
  };

  couleurs:any;
  couleur=new Couleur;
  constructor(private Service:DatacouleurService,private httpClient:HttpClient) { 
  const data : any = this.Service.getData();
    this.Service.getData().subscribe(res =>{
      console.log(res);
      this.couleurs = res;
    });
}

onDeleteConfirm(event): void {
  console.log(event.data);
  this.httpClient.delete<any>('http://127.0.0.1:8000/api/deleteCouleur/'+event.data.id).subscribe(
      res => {
        console.log(res);
        event.confirm.resolve(event.source.data);
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
  }

  onSaveConfirm(event) : void {
    var data = {"nom_couleur" : event.newData.nom_couleur,    
              };
    this.httpClient.put<Couleur>('http://127.0.0.1:8000/api/updateCouleur/'+event.newData.id, data).subscribe(
      res => {
        console.log(res);
        event.confirm.resolve(event.newData);
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
  }
  addRecord(event) {
    var data = {"nom_couleur" : event.newData.nom_couleur,
                };
  this.httpClient.post<Couleur>('http://127.0.0.1:8000/api/addcouleur', data).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }

}
 



 



