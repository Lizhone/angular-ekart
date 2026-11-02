import { Component, ViewChild } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

  @ViewChild(ProductListComponent)
  productList!: ProductListComponent;


  onSearchChanged(searchText: string) {

    this.productList.onSearchChanged(searchText);

  }

}