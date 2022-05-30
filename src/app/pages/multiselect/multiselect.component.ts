import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Couleur } from '../../Models/couleur';

@Component({
  
  selector: 'ngx-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {

  private settings = {
    // Previous config ...
   
    columns: {
     multiple: {
       title: 'Multi select',
       type: 'html',
        editor: {
         type: 'custom',
         valuePrepareFunction: (cell, row) => row,
         component: MultiselectComponent,
        },
     }
    }
   }
  @Input() value;

  couleurs:Couleur; // rendered as this.yourModelStore = ['value', 'value'];

  ngOnInit() {
    this.couleurs = this.value;
  }



}