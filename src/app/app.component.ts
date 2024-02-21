import {Component} from '@angular/core';
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
  private fromBinaryToDecimal(binary: number[]): number {
    let result = 0;
    for(let i = binary.length - 1; i >= 0; i--) {
      result += binary[i] * Math.pow(2, binary.length - 1 - i);
    }
    return result;
  }
  onChangeInput(){
    if(this.hodnota.value){
      this.boxes = this.fromDecimalToBinary(this.hodnota.value);
    }
  }
  onChangeCheckbox(index: number){
    this.boxes[index] = Number(!this.boxes[index]);
    this.hodnota.setValue(this.fromBinaryToDecimal(this.boxes));
  }
}



