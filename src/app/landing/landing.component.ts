import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LandingDialogComponent } from './landing-dialog/landing-dialog.component';

@Component({
  selector: 'broccoli-landing',
  templateUrl: './landing.component.html',
  styles: []
})
export class LandingComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  requestAnInview() {
    const dialogRef = this.dialog.open(LandingDialogComponent, {});
  }
}
