import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

import { LandingDialogService } from './landing-dialog.service';

@Component({
  selector: 'broccoli-landing-dialog',
  templateUrl: './landing-dialog.component.html',
  styles: []
})
export class LandingDialogComponent implements OnInit, OnDestroy {

  dialogLabel: string;
  registed: boolean;
  sendingRequest: boolean;
  serverErrorMsg: string;

  formGroup: FormGroup;
  emailChangeWatcher: Subscription;

  constructor(
    public dialogRef: MatDialogRef<LandingDialogComponent>,
    private ldService: LandingDialogService
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      emailConfirm: new FormControl('', [Validators.required, Validators.email, emailMatchValidator])
    });

    this.formGroup.get('email').valueChanges.subscribe(() => {
      this.formGroup.get('emailConfirm').reset();
    });

    this.dialogLabel = 'Request an invite';
    this.registed = false;
    this.sendingRequest = false;
    this.serverErrorMsg = null;

    function emailMatchValidator(fg: FormGroup) {
      if (!fg || !fg.root) {
        return null;
      }

      if (!fg.root.get('email') || !fg.root.get('emailConfirm')) {
        return null;
      }

      return fg.root.get('email').value === fg.root.get('emailConfirm').value
        ? null : { 'mismatch': true };
    }
  }

  ngOnDestroy() {
    if (this.emailChangeWatcher) {
      this.emailChangeWatcher.unsubscribe();
    }
  }

  getEmailErrorMessage(ctrlName: string): string {
    if (this.formGroup.get(ctrlName).hasError('required')) {
      return 'You must enter a value';
    }

    if (this.formGroup.get(ctrlName).hasError('email')) {
      return 'Not a valid email';
    }

    return '';
  }

  getEmailConfirmErrorMessage() {
    if (this.formGroup.get('emailConfirm').hasError('mismatch')) {
      return 'Email mismatch';
    }

    return '';
  }

  onSubmit(value: any) {
    if (this.formGroup.invalid) {
      return;
    }

    if (this.serverErrorMsg) {
      this.serverErrorMsg = null;
    }

    this.sendingRequest = true;
    this.ldService.requestInvit(
      {
        name: this.formGroup.get('fullName').value,
        email: this.formGroup.get('email').value
      }
    ).subscribe(
      (response) => {
        this.sendingRequest = false;
        this.dialogLabel = 'All done!';
        this.registed = true;
      },
      (error) => {
        this.sendingRequest = false;
        const fixedError = (error.error || { errorMessage: 'Unknown error occurs.' });
        this.serverErrorMsg = (<string>fixedError.errorMessage).replace('Bad Request: ', '');
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

}
