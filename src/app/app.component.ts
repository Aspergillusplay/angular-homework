import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgForOf } from '@angular/common';
import {UserComponent} from "../user/user.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgForOf, FormsModule, UserComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{

}



