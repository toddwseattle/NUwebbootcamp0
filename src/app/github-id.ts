export interface GitIdInfo {
    login: string;
    name: string;
    bio: string;
    avatar_url: string;
    location: string;
    company: string;
    html_url: string;
    created_at: string;
    public_repos: string;
}
export class GithubId implements GitIdInfo {
    public favorite = false;
    public bio: string;
    public avatar_url: string;
    public name: string;
    public location: string;
    public company: string;
    public html_url: string;
    public created_at: string;
    public public_repos: string;
    constructor(public login: string) { }
}
