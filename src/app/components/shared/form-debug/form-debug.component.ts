import { Component,Input,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-debug',
  imports: [CommonModule,FormsModule,NgIf],
  templateUrl: './form-debug.component.html',
  styleUrl: './form-debug.component.css'
})
export class FormDebugComponent implements OnInit {
  @Input() form: any;
  
  
  ngOnInit(): void {

  }
  constructor(){

  }

}
