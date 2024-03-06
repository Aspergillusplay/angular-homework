import { Routes } from '@angular/router';
import {UserComponent} from "../user/user.component";
import {ConverterComponent} from "../converter/converter.component";
import {BookComponent} from "../book/book.component";

export const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'converter', component: ConverterComponent},
  {path: 'book', component: BookComponent}
];
