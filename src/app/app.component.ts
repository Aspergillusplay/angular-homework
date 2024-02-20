import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgForOf, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
  hodnota = new FormControl(1);
  boxes: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  private fromDecimalToBinary(decimal: number): number[] {
    let binaryArray: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
    let index = 7;
    while(decimal > 0){
      binaryArray[index] = decimal % 2;
      decimal = Math.floor(decimal / 2);
      index--;
    }
    return binaryArray;
  }

  onChangeInput(){
    if(this.hodnota.value){
      this.boxes = this.fromDecimalToBinary(this.hodnota.value);
    }
  }
}



