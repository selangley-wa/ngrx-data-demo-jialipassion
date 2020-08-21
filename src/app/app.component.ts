import { Component } from '@angular/core';
import { ErrorService } from './service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  constructor(private errorService: ErrorService) {}
}
