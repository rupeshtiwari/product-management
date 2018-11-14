import { Component, OnInit } from '@angular/core';

// <div pmc-add-product></div>

@Component({
  selector: 'wa-home-container',
  template: `
  <mat-card>
    <mat-card-title>
       Welcome To Ngrx Autonomous Component Example App
    </mat-card-title>
    <mat-card-content>
    <mat-list>
      <h2 mat-subheader>Select any one option: </h2>
      <mat-list-item *ngFor="let folder of folders">
        <button mat-button color="accent" [routerLink]="folder.path">{{folder.name}}</button>
      </mat-list-item>
    </mat-list>
    </mat-card-content>
  </mat-card>
  `,
  styles: [],
})
export class HomeContainerComponent implements OnInit {
  folders: any[];
  constructor() { }

  ngOnInit() {
    this.folders = [
      { name: 'add product', path: '/add-product' }
    ];
  }
}
