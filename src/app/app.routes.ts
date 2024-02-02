import { Routes } from '@angular/router';
import {RandomImgGenComponent} from "./random-img-gen/random-img-gen.component";
import {HomeComponent} from "./home/home.component";
import {FeelingsComponent} from "./feelings/feelings.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
export const routes: Routes = [
  { path: 'random-img-gen', component: RandomImgGenComponent },
  { path: 'feelings/:id', component: FeelingsComponent},
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent},
];
