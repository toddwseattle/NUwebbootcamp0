import { Component } from '@angular/core';
import { GithubId } from './github-id';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Favorite Github Users and Orgs';
  ghId = '';
  ghIds: GithubId[] = [];
  addGhId(toadd: string) {
      this.ghIds.push(new GithubId(toadd)) ;
      this.ghId = '';
  }
}
