import { Component } from '@angular/core';
import { Section } from './domain/section';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // this is needed in order to use enums in template
  Section = Section;
  visibleSection: Section;

  onNavigate(section: Section) {
    this.visibleSection = section;
  }
}
