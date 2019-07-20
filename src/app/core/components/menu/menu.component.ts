import { ShareDataService } from './../../services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  checked: boolean;
  unit: boolean;

  constructor(private router: Router, private shareDataService: ShareDataService) {
    this.checked = false;
    this.unit = false;
  }

  ngOnInit() {
    this.onLoadComponent();
  }
  onLoadComponent() {
    this.router.navigate(['weather-display']);
  }
  changeTheme(checked: boolean) {
    if (checked) {
      this.checked = false;
      this.shareDataService.changeTheme(false);
    } else {
      this.checked = true;
      this.shareDataService.changeTheme(true);
    }
  }
  changeUnit(unit: boolean) {
    if (unit) {
      this.unit = false;
      this.shareDataService.changeUnit(this.unit);
    } else {
      this.unit = true;
      this.shareDataService.changeUnit(this.unit);
    }
  }
}
