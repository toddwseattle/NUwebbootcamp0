export interface GitIdInfo {
    bio: string;
    avatar_url: string;
}
export class GithubId implements GitIdInfo {
    public favorite = false;
    public bio: string;
    public avatar_url: string;
    constructor(public name: string) { }
}
