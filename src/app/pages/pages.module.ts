import { NgModule } from '@angular/core';
import { NbCardModule, NbInputModule, NbMenuModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';



import {AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { FormsModule } from '@angular/forms';
import { TailleComponent } from './taille/taille.component';
import { SaisonComponent } from './saison/saison.component';
import { CouleurComponent } from './couleur/couleur.component';
import { RayonComponent } from './rayon/rayon.component';
import { ProductComponent } from './product/product.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { MagasinComponent } from './magasin/magasin.component';







@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbCardModule,
    NbSelectModule,
  AngularMultiSelectModule,
    HttpClientModule,
    FormsModule
    
    
  ],
  declarations: [
    PagesComponent,
    TailleComponent,
    SaisonComponent,
    CouleurComponent,
    RayonComponent,
    ProductComponent,
    MultiselectComponent,
    MagasinComponent    
  ],

  entryComponents: [
    MultiselectComponent
  ]
})
export class PagesModule {
}
