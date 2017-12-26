# Setting up the tutorial
The tutorial requires node.js, npm, the angular cli, and git.   See the [Readme](readme.md) for more information on installing and verifying these components.

# Switching Steps with npm run workshop
You can switch to a completed step at anytime to see the answer by using the following npm command:
````
npm run workshop
````

this will present a list of the steps. Note: choosing a step wipes out any local work on the repository.
Steps are implemented using git tags.

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

Delete the two paragraphs that output artist and artists.  replace them with an ngFor loop.  

we are also going to add some basic styling.  Let's put our title in a `<div>` with wildcat colors.  Additionally, let's use some default bootstrap styles to add to our text info and button to size more nicely and adopt the bootstrap look.

We will create the wildcat-colors style in `app.component.css`
app.component.html should look like this:
````
<div class="wildcat-colors">
 <h1>
  {{title}}
  </h1>
</div>
<div class="form-group">
  <div class="col-md-4 col-xs-8 col-4">
      <input type="text" class="form-control " placeholder="Artist Name" [(ngModel)]="artist">
  </div>
  <button class="btn" (click)="addArtist(artist)">Add Artist</button>
</div>

<ul>
  <li *ngFor="let a of artists">{{a}}</li>
</ul>

and `app.component.css` should look like this:
````
.wildcat-colors {
    background-color: #4E2A84;
    color: #d8d6d6;
}
# Step 3 to 4:  refactor and create a stylish artist list component with favorites

## Create an Artist class with a name and favorite property
We can use the angular cli to create a typescript class file to hold the Artist object.   Create it with a name string property and a favorite boolean property:

1.  generate the class with the angular cli:
`ng g class Artist`
this will create artist.ts in the src\app directory.

open the file and create this class:
````
 export class Artist {
    public favorite = false;
    constructor(public name: string) { }
}
````

2. now create the new component, `app-artist-list` by executing the following command:
`ng g component artistList`
3. make sure the component activates appropriately.  put the tag `<app-artist-list></app-artist-list>` in `app.component.html`.  
When this is served, you should see artist list works! in the browser.
4. change app.component to create a list of artist objects with a favorite property.  change the method properties as below in app.component.ts:
````
artists: Artist[] = [];

  addArtist(toadd: string) {
      this.artists.push(new Artist(toadd));
      this.artist = '';
  }
  ````
5. change the reference to app-artist-list to pass an input property in `[]` toe the tag:
  `<app-artist-list [artistlist]="artists"></app-artist-list>`
6. add artist list as an input using the @Input decorator.  First, import it from the angular libary.  The first line will read:
`import { Component, OnInit, Input } from '@angular/core';`

also import the artist class:
`import { Artist } from '../artist';`

before the contructor of the class, add the @input decorator and declare `artistlist`:
` @Input() artistlist: Artist[];`
7. finally, in the artistList component (`artist-list.component.ts`) add a method to toggle the favorite flag in the object:
````
 toggleFavorite(favartist: Artist) {
    favartist.favorite = !favartist.favorite;
  }
````
8. now make the view match. Open `artist-list.component.html` We will put the artists and favorites in a `<div>` and `<table>`.  For the favorite column, we will add a button that shows an empty or filled star depending on the disposition of the favorite flag for that artist object.
- create the basic table.  We use some simple bootstrap styles Note: we use `ngFor` again, this time in the table row (`<tr>`) element:
````
<div class="container">
  <table class="table-striped table-bordered">
    <tr>
      <th class="col-md-1 col-sm-1">Fav</th>
      <th class="col-md-6 col-sm-4" >Artist</th>
    </tr>
    <tr *ngFor="let a of artistlist; let i=index">
      <td>
       MyFav
      </td>
      <td >{{a.name}}</td>
    </tr>
  </table>
</div>
````
This should render the artists when adeded using `ng serve`

9. Now we need to toggle the favorite.  in the first table data element, where it now says 'MyFav'  we will put two buttons.  We show the star based on the favorite property.  To do this, we use the `*ngIf= ` structural directive.   When the expression is true, that element is shown (and evaluated if there are methods or properties access within).  A `<span>` is useful to do this.  When the button is clicked, it should call the method we created and toggle the favorite flag.  The button will look like this:
````
  <button (click)="toggleFavorite(a)" class="btn btn-xs artist-fav">
          <span *ngIf="a.favorite" class="glyphicon glyphicon-star" aria-hidden="true"></span>
          <span *ngIf="!a.favorite" class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
  </button>
````
We style this button again with wildcat colors.  css styles are local to the component, so create the `artist-fav` style in `artist-list.component.css`:

````
.artist-fav {
    background-color: #4E2A84;
    color: #d8d6d6;
}
````
# 4 to 5 Add an Artist Info Service
In this step we call out to the server to get some additional meta data for each artist so we can show a picture and potentially some other info.   A service provides a way to isolate logic that may be shared across components.  It's a special angular class, that can be 'injected' into components to provide new functions.
1.  Use the cli to generate the component `ng g s artistInfo`
by default two files are added in the `app` directory
````
  artist-info.service.spec.ts
  artist-info.service.ts
````
The spec file is a test.  Note that unlike components, just a .ts file is generated (no html or css).  A test is generated (unlike a simple class).  

The format of the service is also different from the class.  In particular, the Angular specific annotation @Injectable is added to the class definition.  This make it so it can be 'injected' into the contstructor of the view.   This more losely bind the UI components to the controller logic in the service; and promotes easier substitution for component reuse and testing.

2.  the CLI does not automatically add the service to our modules and components.  First, declare it in the module file `app.module.ts`.  A synonym for services is `provider`.  Add the `artistInfo` service to the provider, and import the definition from the `.ts` file.  In `app.module.ts` `@Module` should look like this:
````
@NgModule({
  declarations: [
    AppComponent,
    ArtistListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ArtistInfoService],
  bootstrap: [AppComponent]
})
````
3.  Let's make our service actually do something.  To start, let's just have it return a string.  We're going to want to get a URL to an artist's picture.  Let's just return a fake url based on what's passed.

