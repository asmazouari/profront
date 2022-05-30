import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Magasin } from '../../Models/magasin';
import { Rayon } from '../../Models/rayon';
import { DatamagService } from '../../service/datamag.service';
import { DatarayonService } from '../../service/datarayon.service';

@Component({
  selector: 'ngx-rayon',
  templateUrl: './rayon.component.html',
  styleUrls: ['./rayon.component.scss']
})
export class RayonComponent  {


  lisMag = this.magasinData();
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
      nom_rayon: {
        title: 'Rayon',
        type: 'any',
        width : '80%'
      },
      id_mag: {
        title: 'magasin',
        type: 'html',
        width : '80%',
        editor:{ type: 'list',
         config: { 
           selectText: 'Select',
            list:this.lisMag
           }
          }, 
      },
    },
  };
  magasins:any;
  rayons:any;
  rayon=new Rayon;
  mag:any;
  constructor(private Service:DatarayonService,private httpClient:HttpClient,private serviceMag:DatamagService) { 

    const data : any = this.Service.getData();
    this.Service.getData().subscribe(res =>{
      console.log(res);
      this.rayons = res;
    });
  
}
  onDeleteConfirm(event): void {
    console.log(event.data);
    this.httpClient.delete<any>('http://127.0.0.1:8000/api/deleteRayon/'+event.data.id).subscribe(
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
      var data = {"nom_rayon" : event.newData.nom_rayon,    
                };
      this.httpClient.put<Rayon>('http://127.0.0.1:8000/api/updateRayon/'+event.newData.id, data).subscribe(
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
      var data = {"nom_rayon" : event.newData.nom_rayon,
               "id_mag": event.newData.id_mag   };
    this.httpClient.post<Rayon>('http://127.0.0.1:8000/api/addRayon', data).subscribe(
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
    magasinData(){
      var settingList: any=[];
      this.serviceMag.getData().subscribe(res=>{
        this.mag = res;
        this.mag.forEach(obj => {
          settingList.push({value:obj.id,title:obj.nom_mag})
          
        });
        let newSettings = this.settings;
        newSettings.columns.id_mag.editor.config.list=settingList;
        this.settings = Object.assign({},this.settings);
      
      });
    }
}
