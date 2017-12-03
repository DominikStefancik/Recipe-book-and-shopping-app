import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Section } from '../domain/section';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Section = Section;
  @Output() navigate: EventEmitter<Section> = new EventEmitter<Section>();

  constructor() { }

  ngOnInit() {
  }

  onNavigationItemClick(section: Section) {
    this.navigate.emit(section);
  }
}
