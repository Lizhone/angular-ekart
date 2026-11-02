
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopHeaderComponent } from './top-header/top-header.component';

import { ContainerComponent } from './container/container.component';
import { SearchComponent } from './container/search/search.component';
import { ProductListComponent } from './container/product-list/product-list.component';
import { FilterComponent } from './container/product-list/filter/filter.component';
import { ProductComponent } from './container/product-list/product/product.component';
import { ProductDetailsComponent } from './container/product-details/product-details.component';

import { FooterComponent } from './footer/footer.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';

import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './container/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopHeaderComponent,
    ContainerComponent,
    SearchComponent,
    ProductListComponent,
    FilterComponent,
    ProductComponent,
    ProductDetailsComponent,
    FooterComponent,
    TermsComponent,
    PrivacyComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
