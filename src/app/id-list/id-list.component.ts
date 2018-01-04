import { Component, OnInit, Input } from '@angular/core';
import { GithubId } from '../github-id';
@Component({
  selector: 'app-id-list',
  templateUrl: './id-list.component.html',
  styleUrls: ['./id-list.component.css']
})

export class IdListComponent implements OnInit {
  @Input() idlist: GithubId[];
  constructor() { }

  ngOnInit() {
  }
  toggleFavorite(favid: GithubId) {
    favid.favorite = !favid.favorite;
  }
}
