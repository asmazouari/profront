import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Magasin } from '../../Models/magasin';
import { DatamagService } from '../../service/datamag.service';

@Component({
  selector: 'ngx-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.scss']
})
export class MagasinComponent  {

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
      nom_mag: {
        title: 'Magasin',
        type: 'any',
      },
      num_tel: {
        title: 'Num tel',
        type: 'any',
      },
      adresse: {
        title: 'Adresse',
        type: 'any',
        
      },
    },
  };

  magasins:any;
  magasin =new Magasin;

  constructor(private serviceMag:DatamagService ,private httpClient:HttpClient) {
    const data : any = this.serviceMag.getData();
    this.serviceMag.getData().subscribe(res =>{
      console.log(res);
      this.magasins = res;
    });
   }
   onDeleteConfirm(event): void {
    console.log(event.data);
    this.httpClient.delete<any>('http://127.0.0.1:8000/api/deletemagasin/'+event.data.id).subscribe(
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
      var data = {"nom_mag" : event.newData.nom_mag,
                  "num_tel":event.newData.num_tel, 
                  "adresse":event.newData.adresse,   
                };
      this.httpClient.put<Magasin>('http://127.0.0.1:8000/api/updatemagasin/'+event.newData.id, data).subscribe(
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
      var data = {"nom_mag" : event.newData.nom_mag,
      "num_tel":event.newData.num_tel, 
      "adresse":event.newData.adresse,  
                  };
    this.httpClient.post<Magasin>('http://127.0.0.1:8000/api/addmagasin', data).subscribe(
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


