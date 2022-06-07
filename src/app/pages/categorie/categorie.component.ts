import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../Models/categorie';
import { DatacategService } from '../../service/datacateg.service';

@Component({
  selector: 'ngx-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent  {

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
      parent_id: {
        title: 'parent_id',
        type: 'any',
      },
      nom_categ: {
        title: 'categorie',
        type: 'any',
      },
     
    },
  };
  

  categories:any;
  categorie =new Categorie;
  constructor(private serviceCateg:DatacategService ,private httpClient:HttpClient) {
    const data : any = this.serviceCateg.getData();
    this.serviceCateg.getData().subscribe(res =>{
      console.log(res);
      this.categories = res;
    });
   }

   onDeleteConfirm(event): void {
    console.log(event.data);
    this.httpClient.delete<any>('http://127.0.0.1:8000/api/deleteCategorie/'+event.data.id).subscribe(
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
      var data = {"parent_id" : event.newData.parent_id,
                  "nom_categ":event.newData.nom_categ, 
                     
                };
      this.httpClient.put<Categorie>('http://127.0.0.1:8000/api/updateCategorie/'+event.newData.id, data).subscribe(
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
      var data = {"parent_id" : event.newData.parent_id,
      "nom_categ":event.newData.nom_categ, 
       
                  };
    this.httpClient.post<Categorie>('http://127.0.0.1:8000/api/addcategorie', data).subscribe(
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

