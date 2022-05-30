import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/product';
import { DatacouleurService } from '../../service/datacouleur.service';
import { DataproductService } from '../../service/dataproduct.service';
import { DatarayonService } from '../../service/datarayon.service';
import { DatatailleService } from '../../service/datataille.service';
import { MultiselectComponent } from '../multiselect/multiselect.component';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  {

  
  listRay = this.rayonData()
   
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
    //selectMode: 'multi',
    
    
    columns: {
      /*id: {
        title: 'ID',
        type: 'any',
        editable : false,
        addable: false
      },*/
      Ref_prod: {
        title: 'Reference',
        type: 'any',
        
      },
      nom_prod: {
        title: 'nom_prod',
        type: 'any',   
      },
      description: {
        title: 'description',
        type: 'any', 
      },
      tva: {
        title: 'tva',
        type: 'any', 
      },

      prix_ht: {
        title: 'prix_ht',
        type: 'any', 
      },
      prix_ttc: {
        title: 'prix_ttc',
        type: 'any', 
      }, 
      id_rayon: {
        title: 'rayon',
        type: 'html',
        width : '80%',
        editor:{ type: 'list',
         config: { 
           selectText: 'Select',
            list:this.listRay
           }
          },
      },
      },  
  };
  rayons:any;
  ray:any;
  tailles:any;
  products:any;
  product=new Product;
  couleurs: any;
  constructor(private seviceProd:DataproductService,private httpClient:HttpClient,private serviceCouleur:DatacouleurService,private serviceTaille:DatatailleService,private serviceRay:DatarayonService) { 
    const data : any = this.seviceProd.getData();
    this.seviceProd.getData().subscribe(res =>{
      console.log(res);
      this.products = res;
    });
    this.serviceCouleur.getData().subscribe(res =>{
      const colors = []
      console.log(res);
      res.forEach(element => {
        colors.push({ id : element.id , itemName : element.nom_couleur})
      });
      this.couleurs = colors;
    });

    this.serviceTaille.getData().subscribe(res =>{
      const tailles = []
      console.log(res);
      res.forEach(element => {
        tailles.push({ id : element.id , itemName : element.nom_taille})
      });
      this.tailles = tailles;
    });

  }

  onDeleteConfirm(event): void {
    console.log(event.data);
    this.httpClient.delete<any>('http://127.0.0.1:8000/api/deleteproduit/'+event.data.id).subscribe(
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
      var data = {    "Ref_prod":event.newData.Ref_prod,"nom_prod" : event.newData.nom_prod,
      "id_rayon":event.newData.id_rayon,"id_saison":event.newData.id_saison,
      "id_categ":event.newData.id_categ, "description":event.newData.description,"tva" : event.newData.tva,"prix_ht":event.newData.prix_ht,
      "prix_ttc" : event.newData.prix_ttc , "colors":this.colorsIdToSend() , "tailles" : this.taillesIdToSend()
                };
      this.httpClient.put<Product>('http://127.0.0.1:8000/api/updateproduit/'+event.newData.id, data).subscribe(
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

    selectedItemsTaille = [];
    settingsMultiSelectTaille = {};

    selectedItems = [];
    settingsMultiSelect = {};
    colorsIdToSend() {
      const dataToSend = []
      this.selectedItems.forEach(item => {
        dataToSend.push(item.id)
      })
      console.log("houniiiiii" , dataToSend);
      
      return dataToSend
    }
    taillesIdToSend() {
      const dataToSend = []
      this.selectedItemsTaille.forEach(item => {
        dataToSend.push(item.id)
      })
      console.log("houniiiiii" , dataToSend);
      
      return dataToSend
    }
    //select colors
    onItemSelect(item: any) {this.colorsIdToSend();}
    OnItemDeSelect(item: any) { this.colorsIdToSend(); }
    onSelectAll(items: any) {this.colorsIdToSend();}
    onDeSelectAll(items: any) { this.colorsIdToSend();}
    //select tailles
    onItemSelectTaille(item: any) {this.taillesIdToSend();}
    OnItemDeSelectTaille(item: any) {this.taillesIdToSend();}
    onSelectAllTaille(items: any) {this.taillesIdToSend();} 
    onDeSelectAllTaille(items: any) {this.taillesIdToSend();}

    
addRecord(event) {
      
console.log('colorssssss' , this.colorsIdToSend());
      var data = {"Ref_prod":event.newData.Ref_prod,"nom_prod" : event.newData.nom_prod,"id_rayon":2,"id_saison":1,
      "id_categ":1,"description":event.newData.description,"tva" : event.newData.tva,"prix_ht":event.newData.prix_ht,
      "prix_ttc" : event.newData.prix_ttc , "colors": this.colorsIdToSend() , "tailles" : this.taillesIdToSend()
                  };
    this.httpClient.post<Product>('http://127.0.0.1:8000/api/addproduit', data).subscribe(
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
        rayonData(){
          var settingList: any=[];
          this.serviceRay.getData().subscribe(res=>{
            this.ray = res;
            this.ray.forEach(obj => {
              settingList.push({value:obj.id,title:obj.nom_rayon})
              
            });
            let newSettings = this.settings;
            newSettings.columns.id_rayon.editor.config.list=settingList;
            this.settings = Object.assign({},this.settings);
          
          });
        }
    }
  


