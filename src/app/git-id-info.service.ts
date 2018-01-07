import { Injectable } from '@angular/core';
import { GitIdInfo } from './github-id';

@Injectable()
export class GitIdInfoService {

  constructor() { }

  GetGitIdInfo(login: string): GitIdInfo {
    return({
      bio: login + ' biography information',
      avatar_url: '/assets/images/User_Avatar.png'
    });
  }
}
