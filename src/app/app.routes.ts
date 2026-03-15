import { Routes } from '@angular/router';
import { Hero } from './pages/user/home/hero/hero';
import { Menu } from './pages/user/menu/menu';
import { CartComponent } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { Login } from './pages/login/login';
import { AuthGuard } from './guards/auth';
import { Orders } from './pages/admin/orders/orders';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Layout } from './pages/admin/layout/layout';
import { AddFood } from './pages/admin/add-food/add-food';

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
        component:CartComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'checkout',
        component:Checkout,
        canActivate:[AuthGuard]
    },
    {
        path:'login',
        component:Login
    },
    {
    path: 'admin',
  component: Layout,
  children: [

    {
      path: 'dashboard',
      component: Dashboard
    },

    {
      path: 'orders',
      component: Orders
    },

    {
      path: 'menu',
      component: Menu
    },

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
    path: 'add-food',
    component: AddFood
}

  ]
}
];
