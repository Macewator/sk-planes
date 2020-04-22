import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FlightFormComponent } from '../flight-form/flight-form.component';
import { FlightsService } from 'src/app/core/services/flights.service'; import { MatSnackBar } from '@angular/material/snack-bar';
;

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewFlightComponent implements OnInit {

  @ViewChild("flightForm") flightForm: FlightFormComponent;

  constructor(
    private dialogRef: MatDialogRef<NewFlightComponent>,
    private flightService: FlightsService,
    private toast: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  addFlight(): void {
    this.flightService.addFlight(this.flightForm.form.value)
      .then(
        this.onAddingSuccess.bind(this),
        this.onAddingerror.bind(this)
      );
  }

  private onAddingSuccess(): void {
    this.dialogRef.close();
    this.toast.open(
      'Flight has been succesfully created', '',
      { panelClass: 'toast-success' });
  }

  private onAddingerror(error): void {
    this.toast.open(
      error.message, '',
      { panelClass: 'toast-error' });
  }
}
