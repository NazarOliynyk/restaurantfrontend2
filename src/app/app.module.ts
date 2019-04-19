
import { SafeHtmlPipe } from './Pipes/safe-html.pipe';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration-component/registration.component';
import { LoginationComponent } from './logination-component/logination.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { RestaurantComponentComponent } from './restaurant-component/restaurant-component.component';
import { ClientComponentComponent } from './client-component/client-component.component';
import { MealComponentComponent } from './meal-component/meal-component.component';
import { MenusectionComponentComponent } from './menusection-component/menusection-component.component';
import { OrderforclientComponentComponent } from './orderforclient-component/orderforclient-component.component';
import { OrderforrestaurantComponentComponent } from './orderforrestaurant-component/orderforrestaurant-component.component';
import { AvatarComponentComponent } from './avatar-component/avatar-component.component';


const routes: Routes = [
   {path: 'app', component: AppComponent},
 // {path: 'users', component: UsersComponent},
  {path: 'login', component: LoginationComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'restaurant', component: RestaurantComponentComponent},
  {path: 'client', component: ClientComponentComponent},
  {path: 'menuSection', component: MenusectionComponentComponent},
  {path: 'meal', component: MealComponentComponent},
  {path: 'avatar', component: AvatarComponentComponent},
  {path: 'restaurantOrder', component: OrderforrestaurantComponentComponent},
  {path: 'clientOrder', component: OrderforclientComponentComponent},
    // children: [
    //   // {path: 'details', component: UserDetailsComponent},
    //   {path: 'update', component: UpdateComponent}
    // ]
  // }
];
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginationComponent,
    RestaurantComponentComponent,
    ClientComponentComponent,
    MealComponentComponent,
    MenusectionComponentComponent,
    OrderforclientComponentComponent,
    OrderforrestaurantComponentComponent,
    AvatarComponentComponent,
    SafeHtmlPipe,
    // UsersComponent,
    // SingleUserComponent,
    // UpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
