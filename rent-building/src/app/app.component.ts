import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rent-building';
  tab: any = 'tab1';
  tab1: any;
  tab2: any;
  tab3: any;

  onClick(check) {
    //    console.log(check);
    if (check === 1) {
      this.tab = 'tab1';
    } else if (check === 2) {
      this.tab = 'tab2';
    } else if (check === 3) {
      this.tab = 'tab3';
    } else if (check === 4) {
      this.tab = 'tab4';
    } else if (check === 5) {
      this.tab = 'tab5';
    } else if (check === 6){
      this.tab = 'tab6';
    } else {
      this.tab = 'tab7';
    }

  }
}

