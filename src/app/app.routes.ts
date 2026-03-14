import { Routes } from '@angular/router';
import { Hero } from './pages/user/home/hero/hero';
import { Menu } from './pages/user/menu/menu';

export const routes: Routes = [
    {
        path: '',
        component:Hero
    },
    {
        path: 'menu',
        component: Menu
    }
];
