import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss'],
})
export class BillDetailsComponent implements AfterViewInit {
  accountNo: any;
  pageType = '';
  @ViewChild('accountInput') accountInput!: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    // Subscribe to query parameters
    this.route.queryParams.subscribe((params) => {
      this.pageType = params['actionType'] || '';
      // You can use the parameters as needed
      console.log('ID:', this.pageType);
      setTimeout(() => {
        this.focusInput();
      }, 10);
    });
  }

  ngAfterViewInit() {
    this.focusInput();
  }

  submit() {
    if (this.pageType === '' || this.pageType === 'bill-details') {
      this.fetchBill();
    } else {
      this.fetchReceipt();
    }
  }

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

  fetchReceipt() {
    let acNo = this.accountNo ? this.accountNo : '';
    let url = `https://www.uppclonline.com/dispatch/Portal/appmanager/uppcl/PrintReceiptServlet?accountNo=${acNo}&reportName=paymentReceipt&displayReportName=Payment%20Receipt&discomName=MVVNL`;
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

  clear(){
    this.accountNo = '';
    this.focusInput();
  }

  focusInput(){
    this.accountInput?.nativeElement?.focus();

  }
}
