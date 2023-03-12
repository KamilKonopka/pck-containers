import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { SearchFormComponent } from './search-form';

@Component({
  standalone: true,
  imports: [RouterModule, SearchFormComponent],
  selector: 'pck-containers-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pck-containers';
}
