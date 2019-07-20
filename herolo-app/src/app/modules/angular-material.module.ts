import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule,
  MatInputModule, MatSlideToggleModule, MatSnackBarModule, MatDividerModule
} from '@angular/material';

@NgModule({
  imports: [MatAutocompleteModule, MatButtonModule, MatCardModule,
    MatInputModule, MatSlideToggleModule, MatSnackBarModule, MatDividerModule],
  exports: [MatAutocompleteModule, MatButtonModule, MatCardModule,
    MatInputModule, MatSlideToggleModule, MatSnackBarModule, MatDividerModule]
})
export class AngularMaterialModule { }
