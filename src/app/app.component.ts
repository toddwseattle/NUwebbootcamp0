import { Component } from '@angular/core';
import { GithubId, GitIdInfo } from './github-id';
import { GitIdInfoService } from './git-id-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Favorite Github Users and Orgs';
  ghId = '';
  ghIds: GithubId[] = [];
  constructor(public ids: GitIdInfoService) { }

  addGhId(toadd: string) {
    this.ids.GetGitIdInfo(toadd).subscribe( info => {
      this.ghIds.push(info as GithubId);
      });
      this.ghId = '';
  }
}
