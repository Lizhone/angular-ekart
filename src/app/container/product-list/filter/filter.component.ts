import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Input() all: number = 0;
  @Input() inStock: number = 0;
  @Input() outOfStock: number = 0;

  @Output() selectedFilterRadioButtonChanged =
    new EventEmitter<string>();

  selectedFilterRadioButton: string = 'all';

  onSelectedFilterRadioButtonChanged() {
    this.selectedFilterRadioButtonChanged.emit(
      this.selectedFilterRadioButton
    );
  }

}