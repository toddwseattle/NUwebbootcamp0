# Setting up the tutorial
The tutorial requires node.js, npm, the angular cli, and git.   See the [Readme](readme.md) for more information on installing and verifying these components.

# Switching Steps with npm run workshop
You can switch to a completed step at anytime to see the answer and to get a completed repository by using the following npm command:
````
npm run workshop
````

this will present a list of the steps. Note: choosing a step wipes out any local work on the repository.
Steps are implemented using [git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging).

# Recommended setup
I recommend you open your each step at the begining with a good programmer's editor like [VS Code](https://code.visualstudio.com/).  Also start a command shell and keep the build running and automatically reloading on `http://localhost:4200` by typing the following at the command line:
````
ng serve
````


p.s. thanks to @EladBezalel and @DevVersion for creating the [material tutorial](https://github.com/EladBezalel/material2-start/) where I stole the workshop code from.  After you complete this one, try that one!

# Step 0 to 1
Step one adds [angular material design](matarial.angular.io) the project for better styling. To do this, we follow the directions on the material.angular.io site:
## 1a Install Material and the CDK (component development kit)
`npm install --save @angular/material @angular/cdk`

## 1b Add Material Animations
`npm install --save @angular/animations`

## 1c Add a pre-built theme
To do this, modify `styles.css` in the `src` directory which contains the global styles for the angular project.  Insert the following:
`@import "~@angular/material/prebuilt-themes/purple-green.css"`

## 1c Add Material Icons and Fonts
In the `src` directory, add the following two lines to `index.html`
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
```

## 1d Activate the styles in the default angular page
open the file `app.component.html` in the `src\app` The material typography is used when the css class `mat-typography` is applied to a portion of an html file.   To do that, let's wrap the whole page in a section by putting the opening tage in the first line of the file:
`<section class="mat-typography">`
and closing it in the last
`</section>`

You should now be able to re run the application and see the use of the Google Roboto font instead of the browser default font for the angular startup page.  Do that by running:
`ng serve`

# Step 1 to 2: create two way binding on an edit field
We are going to do some simple querying of the github api.  have your username and some others handy. We would first like to implement the following user story:

>As a user, I can enter a github username or organization, press an add button, and see a list of all the usernames and organizations I have added.

We need to get some input, and for that we will be using the Forms module, and two of the material design packages controls.   We need to tell angular that we are using the [Angular Forms Module](https://angular.io/guide/forms), the [Material Design Input Module](https://material.angular.io/components/input/overview), and the [Material Design Button Module](https://material.angular.io/components/button/overview).  Additionally, material relies on the [Angular animations module](https://angular.io/guide/animations).

The file `app.module.ts` contains the references to the components and other modules our angular application uses.  Open this file in the editor.   We need to first `Import` using typescript the 3 modules we need.  Add these statements at the beginning:
```typescript
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule } from '@angular/material';
```
Then we put those modules in the import section of the same file:
```typescript
 imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ]
  ```
After modifying the file,

Open the file `app.component.ts` in the \src\app folder. change the value of title from app works! to something like *My Github buddies*.

just below the `title` assignment in the class, initialize a new variable to hold the artist.  

we're going to create a button bound to a function that takes a string (a github username) to add to an array of usernames / github organizations we will display, and reset the edit file.   Within the component should be the following fragment to do those tasks:

````
  title = 'My Favorite Github Users and Orgs';
  ghId = '';
  ghIds: string[] = [];
  addGhId(toadd: string) {
      this.ghIds.push(toadd);
      this.ghId = '';
  }
````

now open the file `app.component.html` to present the view for this information.

Keep the `<section>` header for Material fonts you created in the last step; and the `<h1>` that
displays the title (`{{title}}`) erase everything else--all the Angular boilerplate HTML.

We are going to add a [material design input field](https://material.angular.io/components/input/overview).

Below the `<h1>` with the title; add a new `<div>` with an  `<input>` tag.  In generic HTML this would look something like:
```html
<input placeholder="enter a github username or org" value="toddwseattle">
```
But we are going to do two things:
 - Bind the input to the variable `ghId`
 - Style input using the Angular Material library.

The Angular Template compiler lets code bind to custom attributes.  the Angular forms module contains an atribute `ngModel` that lets you connect an html form input to a typescript property of the component class.   In this case we want the input to be connected to the `ghId` property of AppComponent.  Angular templates bind to tag events using parentheses `()` and to values using brackets `[]`  two way binding uses "bannana brackets" `[()]`.     Use the Ngmodel directive to double bind to the ghId property of your class:
```html
<input placeholder="enter a github username or org" value="toddwseattle" [(ngModel)]="ghId">
```
Now we style it by using the material library. Form elements are styled using the `<mat-form-field>` custom tag and by placing the `matInput` attribute also defined by material and imported via `MatInputModule`.  Our input tag now looks like this:
```html
 <mat-form-field>
    <input matInput [(ngModel)]="ghId" placeholder="Enter a github org or user id"  value="toddwseattle" >
 </mat-form-field>
```
you can then output the current value of the `ghId` property the same way `title` was by adding
```html
<p>{{ghId}}</p>
```
after the `mat-form-field`.

Now we can enter the username, the story needs a way to add it to the list.  Let's add a material button.  For this we need to add the `<button>` element, style it with material, and bind its `(click)` event to the `addGhId()` method we created in `AppComponent` earlier.   Importing the material button module gives us a set of button attributes.  We want a raised style so we use `mat-raised-button` attribute.  The tag looks like this:
```html
<button mat-raised-button (click)="addGhId(ghId)">Add to List</button>
```
We can see the full list of added id's by displaying the `ghIds` arrays.  Becuase ghIds is an array of strings, not a simple type, we need to tell Angular how to expand it.  To format types Angular has special components called pipes (`|`). There is a built in pipe to output stringified json for objects and arrays, so `{{ghIds | json}}` in the HTML will display the array we have added too.

The full html file will look like the following
````html
<section class="mat-typography">
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
</div>
<div>
  <mat-form-field>
    <input matInput [(ngModel)]="ghId" placeholder="Enter a github org or user id"  value="toddwseattle" >
  </mat-form-field>
  <p>{{ghId}}</p>
  <button mat-raised-button (click)="addGhId(ghId)">Add to List</button>
</div>
<p>{{ghIds | json}}</p>
</section>
````
When you run this step, you will need to click tab or click the mouse just above the button to see the edit box.

## Step 2 to 3: ngFor
We now want to display our artists in a bulleted format.  This introduces us to the structural template directive in angular, `ngFor`.

open `app.component.html`.

Delete the two paragraphs that output `ghId` and `ghIds`.  We will replace them with an ngFor loop in the template.  

we are also going to add some basic styling.  Let's put our title in a `<div>` with wildcat colors. 
We will create the wildcat-colors style in `app.component.css`   This is a css style local to our app.component.   We then change `app.component.html` to look like this:
````
<section class="mat-typography">
<div class="wildcat-colors"> 
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
</div>
<div>
  <mat-form-field>
    <input matInput [(ngModel)]="ghId" placeholder="Enter a github org or user id"  value="toddwseattle" >
  </mat-form-field>
  <button mat-raised-button (click)="addGhId(ghId)">Add to List</button>
</div>
<ul>
  <li *ngFor="let i of ghIds">{{i}}</li>
</ul>
</div>
</section>

````
and `app.component.css` should look like this:
````
.wildcat-colors {
    background-color: #4E2A84;
    color: #d8d6d6;
}
````
# Step 3 to 4:  refactor and create a stylish github user list component with favorites

We have implemented a first pass at our user story, so let's tackle another in our backlog:

>As a user, I want to be able to designate some of my saved github id's as favorities

 We want to make it a little bit more stylish, and as we start to save a bigger list of users we like, we would also like to create a set of favorites.  

## Create an Artist class with a name and favorite property
so far we have just been capturing a string for each github id; now we also have to designate whether it is a favorite.  Like in other languages, we can create [classes](https://www.typescriptlang.org/docs/handbook/classes.html), and their cousins [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) in typescript.  In this case we will use a class
We can use the angular cli to create a typescript class file to hold the GithubId object.   Create it with a name string property and a favorite boolean property:

1.  navigate to your root folder (e.g. `\nuwebboot0`) generate the class with the angular cli:
`ng g class GithubId`
this will create `github-id.ts` in the src\app directory.  Notice for the camelCase name it puts a `-` in the name. 

    Open the file and create this class:
````
 export class GithubId {
    public favorite = false;
    constructor(public name: string) { }
}
````
>note like other languages, we create a `contstructor` method called when the class is created.  The contructor takes a name parameter.  If we mark that parameter with `public` or `private`, typescript also creates it as a property of the class.   Note also our class has a public `favorite` property.  We initialize it to false; and typescript knows because of that it will be type boolean.

2. now create the new component that will dispaly our id list, `app-id-list` by executing the following command:
`ng g component idList`  This will create three files in `src/app/id-list`:
   - `id-list.component.html` the component template
   - `id-list.component.spec.ts` a unit test stub file
   - `id-list.component.ts` the component code file.
3. make sure the component activates appropriately.  put the tag `<app-id-list></app-id-list>` in `app.component.html`.  
When this is served, you should see *id-list works!* in the browser.
4. change app.component to use the githubId objects.  First import it, then change the array type, andchage the add method to create a list of githubId objects with a favorite property.  change the method properties as in the below fragment of app.component.ts:
````typescript
import { GithubId } from './github-id';
// ...
 ghIds: GithubId[] = [];
  addGhId(toadd: string) {
      this.ghIds.push(new GithubId(toadd));
      this.ghId = '';
  }
````

5. To output our list in the component, we need to pass it from app-component to app-id-list. To do this, we change the reference to app-artist-list to pass an input property in `[]` to the tag:
  `<app-artist-list [idlist]="ghIds"></app-artist-list>`
6. To receive the id list, add it as as an input using the @Input decorator.  First, import it from the angular libary.  The first line of `id-list.component.ts` will read:
`import { Component, OnInit, Input } from '@angular/core';`

also import the GithubId class as was done in app.component:
`import { GithubId } from './github-id';`

before the contructor of the class, add the @Input decorator and declare 
`@Input() idlist: GithubId[];` 

7. finally, in the artistList component (`artist-list.component.ts`) add a method to toggle the favorite flag in the object:

````typescript
 toggleFavorite(favid: GithubId) {
    favid.favorite = !favid.favorite;
  }
````

The full `id-list.component.ts` file should look like this:
````typescript
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

````
8. now make the view match, with a list and favorite button for each element in the list. For the favorite column, we will add a button that shows an empty or filled heart depending on the disposition of the favorite flag for that id object.
- We will use a few new Material Design components to implement this:  [list](https://material.angular.io/components/list/overview), to show each iteam and [icon](https://material.angular.io/components/icon/overview) to show the heart in the button.  Like with the button component, we need to import them in `app.module.ts`: 
````typescript
import { MatInputModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
/...
imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
````  
- Open `id-list.component.html` Delete the contents of the file We will put the artists and favorites in a `<div>`.   We use the component directive `<mat-list>` to create the list.  Each item is a `<mat-list-item>`.  We use ngFor to show each of the id's in the components list input.
````html
<div>
  <mat-list>
    <mat-list-item *ngFor="let id of idlist">
      {{id.name}}
    </mat-list-item>
  </mat-list>
</div>
````
This should render the artists when added using `ng serve`

9. Now we need to toggle the favorite.  in `<mat-list-item>` tag, before where we show the name with `{{id.name}}`  we will put a button to toggle the favorite.  We show the heart based on the favorite property.  To do this, we use the `*ngIf= ` structural directive.   When the expression is true, that element is shown (and evaluated if there are methods or properties access within).  A `<span>` is useful to do this.  When the button is clicked, it should call the method we created and toggle the favorite flag.  The button within the `<mat-list-item>` will look like this:
````html
  <button mat-icon-button (click)="toggleFavorite(id)">
        <mat-icon *ngIf="id.favorite">favorite</mat-icon>
        <mat-icon *ngIf="!id.favorite">favorite_border</mat-icon>
  </button>  {{id.name}}
````

# 4 to 5 Add a Github ID Info Service
Our next story is:
> As a user, in the list of Github ID's, I see additional information like a description and their avatar

To implement this story, we use an Angular concept called a [service](https://angular.io/tutorial/toh-pt4).  A service is a special [singleton function](http://www.dofactory.com/javascript/singleton-design-pattern) used to share data (or get data) across multiple components. It's a special angular class, that can be ['injected'](https://stackoverflow.com/questions/130794/what-is-dependency-injection) into components to provide new functions.  Let's make our first one:
1.  Use the cli to generate the component `ng g s GitIdInfo`
by default two files are added in the `app` directory
````
  git-id-info.service.spec.ts
  git-id-info.service.ts
````
The spec file is a test.  Note that unlike components, just a .ts file is generated (no html or css).  A test is generated (unlike a simple class).  

The format of the service is also different from the class.  In particular, the Angular specific annotation @Injectable is added to the class definition.  This makes it so it can be 'injected' into the contstructor of the view component.   This more loosely binds the UI components to the controller logic in the service; and promotes easier substitution for component reuse and testing.

2.  the CLI does not automatically add the service to our modules and components.  First, declare it in the module file `app.module.ts`.  A synonym for services is `provider`.  Add the `GitIdInfoService` service to the provider section, and import the definition from the `.ts` file.  In `app.module.ts` `@NgModule` should look like this:
````typescript
// ...
import { GitIdInfoService } from './git-id-info.service';
// ...
@NgModule({
  declarations: [
    AppComponent,
    IdListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [GitIdInfoService],
  bootstrap: [AppComponent]
})
//...
````
3.  Let's make our service actually do something.  We know we at least want to get the id's bio and it's avatar.  To do this, we'll create a new structure that holds the additional information.  Since this will eventually match the webservice we are calling out to with the github api, [interfaces in typescript](https://weblogs.asp.net/dwahlin/the-role-of-interfaces-in-typescript) are a good way to implement. 
- Since we will want access to the structure in both the component and the service, we can implement in seperate file; but we can just add it to the class file we created earlier, `github-id.ts`.  In the file, before the class, create the interface; export it so the component and service can consume it. Additionally, we will want to have the info associated with our id class; so we will have it implement the interface. The file will look like this:
````typescript
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

````
- now import the interface into the service.  We need to create a method in our service that will return the GitIDInfo for a given github login id (what we are calling "name" in our GithubId class).  let's call the method `GetGitIdInfo(login: string).` For our first implementation, we will just create some sample infomation based on the login for the bio; and the same generic avatar for each call. The service implementation will look like this:
````typescript
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

````  
- We will use the service to add the info at the same time the id is entered; so we will call it from `app.component.ts` it must be "injected" into the constructor.  We will assign access to the service to the `ids` class member of AppComponent.   Additionally, the service (and our new interface) must be imported into the component.  The fragment will look like:
````typescript
//...
import { GithubId, GitIdInfo } from './github-id';
import { GitIdInfoService } from './git-id-info.service';
//...
export class AppComponent {
  title = 'My Favorite Github Users and Orgs';
  ghId = '';
  ghIds: GithubId[] = [];
  constructor(public ids: GitIdInfoService) { }
//...
````
- Once the *Add to List* button is pressed, we need to call the service to look up the bio information for the user and fetch the avatar.  We do this by calling `this.ids.GetGitIdInfo` with the github user id.  Let's modify the `addGhId` method of AppComponent to do that in `app.component.ts`: 
````typescript
// ...
  addGhId(toadd: string) {
      const info = this.ids.GetGitIdInfo(toadd);
      const newid = new GithubId(toadd);
      newid.avatar_url = info.avatar_url;
      newid.bio = info.bio;
      this.ghIds.push(newid);
      this.ghId = '';
  }
// ...
````
- Now we can change our **id-list** component to display this additional information by changing the template `id-list/id-list.component.html`:
````html
<!-- ...-->
<mat-list-item *ngFor="let id of idlist">
     <button mat-icon-button (click)="toggleFavorite(id)">
        <mat-icon *ngIf="id.favorite">favorite</mat-icon>
        <mat-icon *ngIf="!id.favorite">favorite_border</mat-icon>
    </button>  {{id.name}} ({{id.bio}})  Avatar: {{id.avatar_url}}
    </mat-list-item>
<!-- ...-->
````
Now when we run our application, we see that after adding the user id, it calls the service to create the bio string; and also displays the text of the avatar_url.  Of course, we'd like to actually display an avatar image.  To create a default image to be displayed, we can leverage the `asset` folder created by the `cli` in the `\src` directory when we put our application together.  All the files we put here are copied to the final directory, and accessible by referencing `/assets` as a relative url.   Let's put our default avatar in an `images` directory, in our project structure: `/src/assets/images`.  There is a a decent default avatar on the wikimedia.org site [User_avatar](https://commons.wikimedia.org/wiki/File:User_Avatar.png).  (I downloaded the 450x450 one; but we are going to initially show it very small to fit on a single line).  Download this and place it in `/src/assets/images`.   Now modify our list in `id-list/id-list.component.html` to read:
````html
<!-- ...-->
<mat-list-item *ngFor="let id of idlist">
      <button mat-icon-button (click)="toggleFavorite(id)">
          <mat-icon *ngIf="id.favorite">favorite</mat-icon>
          <mat-icon *ngIf="!id.favorite">favorite_border</mat-icon>
      </button>
      <img [src]="id.avatar_url" alt="avatar" width="50"> {{id.name}} ({{id.bio}})  
    </mat-list-item>
<!-- ...-->
````
Now when you run the application, you should see our generic Avatar in front of the user name.

# Step 5 to 6 Using HttpClient to call the GIT REST API
For our last step, we are going to extend our last user story to retrieve the information from github:
> As a user, in the list of Github ID's, I see additional information like their bio and their avatar *retrieved from github.com*.

To implement this, we are going to extend our service to call a [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) provided by [Github](https://developer.github.com/v3/).   While many of these calls require authentication, basic information on a user does not.   Checkout the [github users api docs](https://developer.github.com/v3/users/).  You can get an idea of what this api returns by looking at a call from my userid  [https://api.github.com/users/toddwseattle](https://api.github.com/users/toddwseattle)

REST API's typically return their data in a format like XML or JSON.  Github returns in JSON, which is great because it maps well to structures in javascript and interfaces in typescript.

## 5a Refactoring for login and name  

When we look at the github API structure, you may see a problem.  We have been using the property **name** to represent the github id; but the github API uses **login** to represent the github user id, and the **name** property is the friendly name of the login.   Before we call out to the HttpClient, let's refactor the application to use login, and add a name property.
1. First, modify `github-id.ts` to have login in the constructor of the class; and add a name property to the interface:
````typescript
export interface GitIdInfo {
    login: string;
    name: string;
    bio: string;
    avatar_url: string;
}
export class GithubId implements GitIdInfo {
    public favorite = false;
    public bio: string;
    public avatar_url: string;
    public name: string;
    constructor(public login: string) { }
}
````
Change the **GetGitIdInfo** method in  `github-id-info.ts` service like this to conform to our new interface:
```typescript
GetGitIdInfo(login: string): GitIdInfo {
    return({
      bio: login + ' biography information',
      avatar_url: '/assets/images/User_Avatar.png',
      login: login,
      name: ''
    });
  }
````
Fix the `id-list.component.html` template to show login instead of name:
````html
 <mat-list-item *ngFor="let id of idlist">
      <button mat-icon-button (click)="toggleFavorite(id)">
          <mat-icon *ngIf="id.favorite">favorite</mat-icon>
          <mat-icon *ngIf="!id.favorite">favorite_border</mat-icon>
      </button>
      <img [src]="id.avatar_url" alt="avatar" width="50"> {{id.login}} ({{id.bio}})  
    </mat-list-item>
````
This should run and behave as before.
## 5b Use the HttpClient in the git-id-info.service
Angular provides a service to make it easy to call web and restful services like github, called the [HttpClient](https://angular.io/tutorial/toh-pt6).  Note This was introduced in Angular 4.3; so there are still references on the web (before summer 2017) to a prior http service.

Like our own service, we import and inject in the constructor the HttpClient.  The fragment in `git-id-info.service.ts` looks like this:
````typescript
// ...
import { HttpClient } from '@angular/common/http';
// ...
@Injectable()
export class GitIdInfoService {

  constructor(private http: HttpClient) { }
// ...
````
We also need to import it into our `@NgModule` in `app.module.ts`:
````typescript
//...
import { HttpClientModule } from '@angular/common/http';
// ...
@NgModule({
  declarations: [
    AppComponent,
    IdListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [GitIdInfoService],
  bootstrap: [AppComponent]
})
// ...

````
So far all of our interactions have been local to the machine, but a key probelem with web applications, is how they handle asyncrhonous operations:  mouse movements, keyboard inputs, the user unexpectedly hitting the 'back' button, and calling out to web servers that have varying degrees of network latency.   Angular makes extensive use of a library called [rxJs](https://github.com/ReactiveX/rxjs) which provides 'reactive' extensions for javascript/typescript and makes it easy to handle asyncrhonous operations.  

Core to observables is the idea that things like mouse movements and data coming back from a web server are *streams*.   An obervable provides a way to *subscribe* to a stream to get the values emitted. [This article](https://developer.telerik.com/topics/web-development/introduction-observables-angular-developers/) describes how we come to observables in angular well In the case of our API call, just one value is emitted after we do an *http get* from the service.  In general, it makes sense to return the Observable up from the service rather than the subscribed value as you shall see.

### Calling HttpClient Get Method

The [HttpClient](https://angular.io/api/common/http/HttpClient) provides a complete way to call rest services like the Github API.  It has methods that correspond to the main Http protocol verbs of get, post, put, patch, and delete.   To get the information about the user, we need to call get with the api for a username.   The get method returns an Observable which is a typescript [generic](https://www.typescriptlang.org/docs/handbook/generics.html).   We can add a type in `<>` in the call signature to specify the type we are returning.   In our case, we are mapping the result of the `/users/{user}` REST call to the interface we defined, **GitIdInfo**.  So we import the `Observable` form the rxjs library and change our call signature in `git-id-info.service.` to: 
````typescript
// ...
import { Observable } from 'rxjs/Observable';
// ...
 GetGitIdInfo(login: string): Observable<GitIdInfo>
//
````
For the API call, I prefer putting the base URL in a constant in the file; and also creating a constant in the method for the specific api.   We make the call based on the username passed in.   As mentioned, we return the whole observable.  `git-id-info.service.ts` now looks like this:
````typescript
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
````
### Consuming the Observable
We now need to consume the API and its observable in our component.  We call the service in `app.component.ts` in the **addGhId** method, which currently looks like this:

````typescript
 addGhId(toadd: string) {
      const info = this.ids.GetGitIdInfo(toadd);
      const newid = new GithubId(toadd);
      newid.avatar_url = info.avatar_url;
      newid.bio = info.bio;
      this.ghIds.push(newid);
      this.ghId = '';
  }
````
This isn't quite what we need for a couple of reasons:
1.  the **GetGitIdInfo** method of our service no longer returns a simple interface, **GitIdInfo**, but now returns **Observable<GitIdInfo>** an Observable with the type of **GitIdInfo**.   We need to handle that appropriately, by subscribing to the observable
2. We augment an object we create; but there is no reason we couldn't just use the information returned by the interface, becaue when the call is successful; all the information we need (and more) is populated in the interface.

To do both these things we change the method to:
````typescript
addGhId(toadd: string) {
    this.ids.GetGitIdInfo(toadd).subscribe( info => {
      this.ghIds.push(info as GithubId);
      });
    this.ghId = '';
  }
````
You might see something unfamiliar here:  We call **GetGitIdInfo** as before, it now returns an **Observable**.   We then call the **subscribe** method; which will get called by the observable when it emits new data.  As a parameter to the subscribe, we pass an anonymous arrow function.  info will contain the emitted **GitHubId** data from the api call.  We can then push this on the array.


