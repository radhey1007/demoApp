import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
