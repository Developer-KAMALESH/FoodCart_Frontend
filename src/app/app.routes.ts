import { Routes } from '@angular/router';
import { Hero } from './pages/user/home/hero/hero';
import { Menu } from './pages/user/menu/menu';
import { CartComponent } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';

export const routes: Routes = [
    {
        path: '',
        component:Hero
    },
    {
        path: 'menu',
        component: Menu
    },
    {
        path:'cart',
        component:CartComponent
    },
    {
        path:'checkout',
        component:Checkout
    }
];
