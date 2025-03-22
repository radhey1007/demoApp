import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { HighchartComponent } from './highchart/highchart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { LatestFeaturesComponent } from './latest-features/latest-features.component';

@NgModule({
  declarations: [
    AppComponent,
    ExcelUploadComponent,
    BillDetailsComponent,
    HighchartComponent,
    LatestFeaturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
