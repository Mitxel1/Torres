import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:"",redirectTo:"/register",pathMatch:'full'
    },
    {//nueva forma de enrutamiento 
        path:"register",title:"",loadComponent: () =>import("./components/register/register.component"),
    },
    {//nueva forma de enrutamiento 
        path:"info/:codigo",title:"",loadComponent: () =>import("./components/info/info.component"),
    },
];
