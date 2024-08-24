import { ChangeDetectorRef, Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss']
})
export class ExcelUploadComponent {

  excelData: any = [];
  headers: string[] = [];
  searchText: string = '';
  isTableHasData = false;

  constructor(private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
    const storedData = localStorage.getItem('excelData');
    let finalData = storedData ? JSON.parse(storedData) : null;
    console.log(finalData);
    this.setTable(finalData); 
  }



  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      
      const data = <any[][]>XLSX.utils.sheet_to_json(ws, { header: 1 });
      // this.headers = data[0];
      // this.excelData = data.slice(1);
      this.setTable(data);
      this.isTableHasData = this.excelData ? true : false;
      localStorage.setItem('excelData', JSON.stringify(data));
    };
  
    reader.readAsBinaryString(target.files[0]);
  }

  setTable(data:any){
    this.headers = data ? data[0] : null;
    this.excelData = data ? data.slice(1) : null;
  }

  filteredData() {
    if (!this.searchText) return this.excelData;

    const lowerSearchText = this.searchText.toLowerCase();

    return this.excelData.filter((row:any) => 
      row.some((cell:any) => 
        cell && cell.toString().toLowerCase().includes(lowerSearchText)
      )
    );

  }

  clear(){
    this.searchText = '';  
  }
}