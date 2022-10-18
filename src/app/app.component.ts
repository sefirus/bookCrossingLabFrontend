import { Component } from '@angular/core';

export var configUrl : string = 'assets/config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'book-crossing-front';
}
