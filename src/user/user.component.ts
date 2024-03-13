import { Component } from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.prod";

interface Zakaznik {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  // adresa: {
  //   ulica: string | null;
  //   mesto: string | null;
  // };
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

  constructor(private formBilder: FormBuilder, private http: HttpClient) {
  }
  hodnota = new FormControl('');

  formular = this.formBilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required]
    // adresa: this.formBilder.group({
    //   ulica: ['', Validators.required],
    //   mesto: ['', Validators.required]
    // })
  })
  ngOnInit() {
    this.http.get<Zakaznik[]>(`${environment.BACKEND_URL}/api/customers`).subscribe(zakaznici => {
      this.zakaznici = zakaznici;
    });
  }

  zakaznici: Zakaznik[] = []; // массив для хранения данных клиентов

  onSubmit() {
    const formValue = this.formular.value;
    const newZakaznik: Zakaznik = {
      firstName: formValue.firstName || '',
      lastName: formValue.lastName || '',
      email: formValue.email || ''
    };
    this.http.post(`${environment.BACKEND_URL}/api/customers`, newZakaznik).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
    this.formular.reset();
  }

  nastavForm(){
    this.formular.setValue({
      firstName: 'Artem',
      lastName: 'Ponomarov',
      email: 'kar@u.com'
      // adresa: {
      //   ulica: "Tajovskeho 30",
      //   mesto: "Banska Bystrica",
      // }
    });
  }
}
