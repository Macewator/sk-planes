import { Component, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FlightsService } from 'src/app/core/services/flights.service';
import { Flight } from 'src/app/models/flight.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightFormComponent } from '../flight-form/flight-form.component';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightEditComponent implements AfterViewInit {

  @ViewChild("flightForm") flightForm: FlightFormComponent;
  flight: Flight;

  constructor(
    private router: Router,
    private toast: MatSnackBar,
    private route: ActivatedRoute,
    private flightService: FlightsService,
  ) { }

  ngAfterViewInit(): void {
    this.getFlight();
  }

  resetForm(): void {
    this.flightForm.form.reset();
  }

  getFlight(): void {
    const key = this.route.snapshot.params['key'];
    this.flightService.getFlight(key)
      .pipe(tap((flight: Flight) => this.flightForm.setFlight(flight)))
      .subscribe((flight: Flight) => this.flight = flight)
  }

  updateFlighte(): void {
    const fkey: string = this.flight.key;
    this.flightService.updateFlight(fkey, this.flightForm.form.value)
      .then(this.onSuccess.bind(this), this.onFailur.bind(this));
  }

  removeFlight() {
    const key = this.route.snapshot.params['key'];
    this.flightService.removeFlight(key)
      .then(this.onSuccess.bind(this), this.onFailur.bind(this));
  }

  private onSuccess(): void {
    this.router.navigate(['/dashboard']);
    this.toast.open('Operation has been successfully proced', '', { panelClass: 'toast-success' });
  }

  private onFailur(error): void {
    this.toast.open(error.message, '', { panelClass: 'toast-error' });
  }
}
