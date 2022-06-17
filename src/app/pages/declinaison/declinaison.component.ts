import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-declinaison',
  templateUrl: './declinaison.component.html',
  styleUrls: ['./declinaison.component.scss']
})
export class DeclinaisonComponent implements OnInit {

  settings = {
    actions:false,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate : false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave : false,
    },
     delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
    },
    columns: {
    
      code_barre: {
        title: 'Code à barre',
        type: 'any',
        width : '80%'
      },
      id_prod: {
        title: 'Produit',
        type: 'any',
        width : '80%'
      },
      id_couleur: {
        title: 'Couleur',
        type: 'any',
        width : '80%'
      },
      id_taille: {
        title: 'Taille',
        type: 'any',
        width : '80%'
      },
    },
  };

  declinaisons:any;
  constructor(private httpClient : HttpClient) { 
    this.httpClient.get('http://127.0.0.1:8000/api/declinaison').subscribe(res =>{
      console.log(res);
      this.declinaisons = res;
    });
  }

  ngOnInit(): void {
  }

}
