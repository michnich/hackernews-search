import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

let MaterialModules = [
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModules
  ],
  exports: [MaterialModules]

})
export class MaterialModule { }
