import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GithubId, GitIdInfo } from './github-id';
import { GitIdInfoService } from './git-id-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'My Favorite Github Users and Orgs';
  ghId = '';
  ghIds: GithubId[] = [];
  private getGitsub: Subscription;
  errorMessage = null;
  constructor(public ids: GitIdInfoService) { }

  addGhId(toadd: string) {
    this.errorMessage = null;
    this.getGitsub = this.ids.GetGitIdInfo(toadd).subscribe( info => {
      this.ghIds.push(info as GithubId);
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });
      this.ghId = '';
  }

  ngOnDestroy() {
    this.getGitsub.unsubscribe();
  }
}
