import { Component, computed, effect, OnInit, signal, WritableSignal } from '@angular/core';


@Component({
  selector: 'app-latest-features',
  templateUrl: './latest-features.component.html',
  styleUrls: ['./latest-features.component.scss']
})
export class LatestFeaturesComponent implements OnInit {

  count = signal(0);
  user = signal({name:'John', age:30});
  items = signal<string[]>(['Item 1', 'Item 2']);

   //Computed Signals
  price = signal(100);
  quantity = signal(2);
  total = computed(() => this.price() * this.quantity());

  // effect
  name = signal('Angular');

  //Writable and Readonly Signals
  private _secret = signal('Hidden Data');


  constructor(){
    effect(() => {
      console.log(`The name is: ${this.name()}`);
    });
  }

  increment() {
    this.count.set(this.count() + 1);
    // this.updateUser();
    // this.addItem();
    this.increaseQuantity();
  }

  updateUser() {
    this.user.set({...this.user(), age:this.user().age + 1});
    // console.log(this.user());
  }

  ngOnInit(): void {
    this.updateUser();   
   
  }

  addItem() {
    this.items.set([...this.items(), `Item ${this.items().length + 1}`]);
    console.log(this.items());
  }

  //Computed Signals
  increaseQuantity() {
    this.quantity.set(this.quantity() + 1);
    console.log(this.total());
  }

  // Effects (Side Effects)
  changeName(newName: string) {
    this.name.set(newName);
  }

  reveal() {
    this._secret.set('Revealed Data');
  }
  
}






