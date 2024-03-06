import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgOptimizedImage} from "@angular/common";

interface Kniha {
  nazov: string | null;
  autor: string | null;
  rokVydania: number | null;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  styleUrls: ['./book.component.css']
})
export class BookComponent{

  constructor(private formBuilder: FormBuilder) { }

  rok: number = new Date().getFullYear();


  formular = this.formBuilder.group({
    nazov: ['', Validators.required],
    autor: ['', Validators.required],
    rokVydania: [this.rok, [Validators.required, Validators.min(0)]]
  })

  knihy: Kniha[] = [];

  onSubmit() {
    this.knihy.push(this.formular.value as Kniha);
    console.log(this.knihy);
    this.formular.reset();
  }

  nastavForm(){
    this.formular.setValue({
      nazov: 'Vojna a mier',
      autor: 'Lev Tolstoj',
      rokVydania: 1869
    });
  }
}
