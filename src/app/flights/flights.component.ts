import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../core/services/flights.service';
import { Flight } from '../models/flight.model';
import { Observable } from 'rxjs';
import { NewFlightComponent } from './new-flight/new-flight.component';
import { MatDialog } from '@angular/material/dialog';
import { FlightDetailsComponent } from './flight-details/flight-details.component';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {

  flights: Observable<Flight[]>;

  constructor(
    private flightsService: FlightsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getFlights();
  }

  getFlights(): void {
    this.flights = this.flightsService.getFlights();
  }

  openNewFlightModal(): void {
    this.dialog.open(NewFlightComponent);
  }

  openFlightDetails(flight: Flight): void {
    this.dialog.open(FlightDetailsComponent, 
      {
        data: flight
      });
  }
}
