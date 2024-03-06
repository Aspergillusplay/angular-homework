import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-converter',
  standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent {
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
