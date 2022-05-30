import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Saison } from '../../Models/saison';
import { DatasaisonService } from '../../service/datasaison.service';

@Component({
  selector: 'ngx-saison',
  templateUrl: './saison.component.html',
  styleUrls: ['./saison.component.scss']
})
export class SaisonComponent  {
  
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
      nom_saison: {
        title: 'Saison',
        type: 'any',
        width : '80%'
      },
    },
  };
  saisons:any;
  saison =new Saison;
  constructor(private Service:DatasaisonService,private httpClient:HttpClient) {

    const data : any = this.Service.getData();
    this.Service.getData().subscribe(res =>{
      console.log(res);
      this.saisons = res;
    });
   }
   onDeleteConfirm(event): void {
    console.log(event.data);
    this.httpClient.delete<any>('http://127.0.0.1:8000/api/deletesaison/'+event.data.id).subscribe(
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
      var data = {"nom_saison" : event.newData.nom_saison,    
                };
      this.httpClient.put<Saison>('http://127.0.0.1:8000/api/updatesaison/'+event.newData.id, data).subscribe(
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
      var data = {"nom_saison" : event.newData.nom_saison,
                  };
    this.httpClient.post<Saison>('http://127.0.0.1:8000/api/addsaison', data).subscribe(
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
