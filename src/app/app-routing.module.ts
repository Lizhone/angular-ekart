
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerComponent } from './container/container.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CartComponent } from './container/cart/cart.component';

const routes: Routes = [
  { path: '', component: ContainerComponent, pathMatch: 'full' },
  { path: 'sale', component: ContainerComponent },
  { path: 'cart', component: CartComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
