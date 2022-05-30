import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


import { Taille } from '../../Models/taille';
import { DatatailleService } from '../../service/datataille.service';

@Component({
  selector: 'ngx-taille',
  templateUrl: './taille.component.html',
  styleUrls: ['./taille.component.scss']
})
export class TailleComponent  {
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
      nom_taille: {
        title: 'Taille',
        type: 'any',
        width : '80%'
      },
    },
  };
  tailles:any;
  taille =new Taille;
  constructor(private Service:DatatailleService,private httpClient:HttpClient) { 

    const data : any = this.Service.getData();
    this.Service.getData().subscribe(res =>{
      console.log(res);
      this.tailles = res;
    });

  }
  onDeleteConfirm(event): void {
    console.log(event.data);
    this.httpClient.delete<any>('http://127.0.0.1:8000/api/deleteTaille/'+event.data.id).subscribe(
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
      var data = {"nom_taille" : event.newData.nom_taille,    
                };
      this.httpClient.put<Taille>('http://127.0.0.1:8000/api/updateTaille/'+event.newData.id, data).subscribe(
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
      var data = {"nom_taille" : event.newData.nom_taille,
                  };
    this.httpClient.post<Taille>('http://127.0.0.1:8000/api/addtaille', data).subscribe(
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
