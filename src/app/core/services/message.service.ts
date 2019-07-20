import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})

export class MessageService {

  constructor(private snackbar: MatSnackBar) {}
  successMessage(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 3000
    });
  }
  failedMessage(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 3000
    });
  }
}
