import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Favorite Github Users and Orgs';
  ghId = '';
  ghIds: string[] = [];
  addGhId(toadd: string) {
      this.ghIds.push(toadd);
      this.ghId = '';
  }
}
