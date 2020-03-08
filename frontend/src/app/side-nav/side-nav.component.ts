import { Component, OnInit } from '@angular/core';
import { Constants } from './../app.constant';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  currentIndex = 0;

  constructor() { }

  ngOnInit() {
  }

  get menus() {
    return Constants.MENUS;
  }

  changeNav(index: number) {
    this.currentIndex = index;
  }
}
