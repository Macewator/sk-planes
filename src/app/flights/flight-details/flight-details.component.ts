import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Flight } from 'src/app/models/flight.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightDetailsComponent implements OnInit {

  flight: Flight;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<FlightDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Flight
  ) {
    this.flight = data;
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  editFlight(): void {
    this.close();
    this.router.navigate(['/dashboard/flights', this.flight.key]);
  }
  
}
