import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-google-map-dialog',
  templateUrl: './google-map-dialog.component.html',
  styleUrls: ['./google-map-dialog.component.css']
})
export class GoogleMapDialogComponent implements OnInit {

  public markers: Array<object>;

  constructor(
    private dialogRef: MdDialogRef<GoogleMapDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MD_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.markers = this.data.markers;
  }

  close() {
    this.dialogRef.close();
  }
}
