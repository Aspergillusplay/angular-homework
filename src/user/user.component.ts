import { Component } from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";

interface Zakaznik {
  meno: string | null;
  priezvisko: string | null;
  adresa: {
    ulica: string | null;
    mesto: string | null;
  };
}
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  constructor(private formBilder: FormBuilder) {
  }
  hodnota = new FormControl('');

  formular = this.formBilder.group({
    meno: ['', Validators.required],
    priezvisko: ['', Validators.required],
    adresa: this.formBilder.group({
      ulica: ['', Validators.required],
      mesto: ['', Validators.required]
    })
  })

  zakaznici: Zakaznik[] = []; // массив для хранения данных клиентов

  onSubmit() {
    this.zakaznici.push(this.formular.value as Zakaznik);
    console.log(this.zakaznici);
    this.formular.reset();
  }

  nastavForm(){
    this.formular.setValue({
      meno: 'Artem',
      priezvisko: 'Ponomarov',
      adresa: {
        ulica: "Tajovskeho 30",
        mesto: "Banska Bystrica",
      }
    });
  }
}
