import { Routes } from '@angular/router';
 import { ColllectionComponent } from './colllection/colllection.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DiningComponent } from './dining/dining.component';
import { TajComponent } from './colllection/restaurants/taj/taj.component';
import { BurgarComponent } from './colllection/restaurants/burgar/burgar.component';
import { BiryaniComponent } from './colllection/restaurants/biryani/biryani.component';
import { PaymentComponent } from './profile/cart/payment/payment.component';
import { NightlifeComponent } from './nightlife/nightlife.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
     {path: '',
  component: ColllectionComponent},
  {path: 'profile',component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'delivery', component: DeliveryComponent},
  {path: 'dining', component: DiningComponent},
  {path: 'taj', component: TajComponent},
  {path: 'burgar', component: BurgarComponent},
  {path: 'biryani', component: BiryaniComponent},
  {path: 'profile/cart/payment', component: PaymentComponent},
  {path: 'nightlife', component: NightlifeComponent},
  {path: 'search', component: SearchComponent}
];

 