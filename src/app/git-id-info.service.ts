import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitIdInfo, GithubId } from './github-id';
import { Observable } from 'rxjs/Observable';

const githubAPI = 'https://api.github.com';

@Injectable()
export class GitIdInfoService {

  constructor(private http: HttpClient) { }

  GetGitIdInfo(login: string): Observable<GitIdInfo> {
    const userAPI = githubAPI + 'users/';
    return(this.http.get<GitIdInfo>(userAPI + login));
  }
}
