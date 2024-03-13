import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.prod";

interface Kniha {
  authorFirstname: string | null | undefined;
  authorLastname: string | null | undefined;
  title: string | null | undefined;
  isbn: string | null | undefined;
  count: number | null | undefined;
}


@Component ({
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
export class BookComponent implements OnInit{

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<Kniha[]>('http://localhost:8080/api/books').subscribe(books => {
      this.knihy = books;
    });
  }

  rok: number = new Date().getFullYear();


  formular = this.formBuilder.group({
    title: ['', Validators.required],
    authorFirstname: ['', Validators.required],
    authorLastname: ['', Validators.required],
    isbn: ['', Validators.required],
    count: [1, [Validators.required, Validators.min(0)]]
  })


  knihy: Kniha[] = [];

  // onSubmit() {
  //   this.knihy.push(this.formular.value as Kniha);
  //   console.log(this.knihy);
  //   this.formular.reset();
  // }


  onSubmit() {
    const formValue = this.formular.value;
    const newBook = {
      authorFirstname: formValue.authorFirstname,
      authorLastname: formValue.authorLastname,
      title: formValue.title,
      isbn: formValue.isbn,
      count: Number(formValue.count) // преобразуйте count в число
    };
    this.knihy.push(newBook);
    this.http.post(`${environment.BACKEND_URL}/api/books`, newBook).subscribe(response => {
      console.log(response);
    });
    this.formular.reset();
  }


  nastavForm() {
    this.formular.setValue({
      title: 'Vojna a mier',
      authorFirstname: 'Lev',
      authorLastname: 'Tolstoj',
      isbn: 'ISBN12A69C',
      count: 1
    });
  }
}
