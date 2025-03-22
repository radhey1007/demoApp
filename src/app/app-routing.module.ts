import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { HighchartComponent } from './highchart/highchart.component';
import { LatestFeaturesComponent } from './latest-features/latest-features.component';

const routes: Routes = [  
  {
    path: '',
    redirectTo: 'bill-details',
    pathMatch: 'full'
  }, 
  {
    path:'bill-details',
    component: BillDetailsComponent,
  },
  {
    path: 'excel-upload',
    component: ExcelUploadComponent
  }, 
  {
    path: 'highchart',
    component: HighchartComponent
  }, 
  {
    path: 'home',
    component: LatestFeaturesComponent
  }, 
  {
    path: '**',
    component: BillDetailsComponent
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
