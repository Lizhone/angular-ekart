import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchText: string = '';

  @Output() searchChanged = new EventEmitter<string>();

  onSearch() {
    this.searchChanged.emit(this.searchText);
  }

}