import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'newsApp';
  status!: boolean;

  constructor() {}

  toggleSidenav(): void{
    this.status = !this.status;
  }
}
