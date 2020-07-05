import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  button1Text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
    '      Ab at beatae dolore, eum, exercitationem id iure minus nisi odio officiis quasi quo repudiandae tempora totam ut,\n' +
    '      voluptatibus voluptatum. Labore, obcaecati.';
  button2Text = 'Button 2 text';
}
