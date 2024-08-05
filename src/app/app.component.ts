import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UP';
  accountNo: any;
  constructor(){

  }
  fetchBill(){
    let acNo = this.accountNo ? this.accountNo : '';
    let url = `https://www.uppclonline.com/dispatch/Portal/BD?accNo=${acNo}&dis=MVVNL`;
    if(acNo){
      this.openExternalLink(url);
    } else {
      alert('Enter the account Number!')
    }
  }

  openExternalLink(url: string) {
    window.open(url, '_blank'); // Opens in a new tab
  }
}
