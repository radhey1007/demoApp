import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'UP';
  accountNo: any;
  constructor() {}
  fetchBill() {
    let acNo = this.accountNo ? this.accountNo : '';
    let url = `https://www.uppclonline.com/dispatch/Portal/BD?accNo=${acNo}&dis=MVVNL`;
    if (acNo) {
      if (localStorage.getItem('token')) {
        this.openExternalLink(url);
      } else {
        this.openDialogue(url);
      }
    } else {
      alert('Enter the account Number!');
    }
  }

  openDialogue(url: string) {
    const code = prompt('Enter Auth code:');
    if (code === '80900') {
      this.openExternalLink(url);
      localStorage.setItem('token', code);
      // Your code for proceeding
    } else {
      alert('Invalid code.');
    }
  }

  openExternalLink(url: string) {
    window.open(url, '_blank'); // Opens in a new tab
  }
}
