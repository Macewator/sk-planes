import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Flight, Crew } from 'src/app/models/flight.model';
import { FlightsValidators } from 'src/app/shared/validators/flights-validators';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightFormComponent implements OnInit {

  form: FormGroup;
  crew: FormArray;
  jobs = [
    { label: 'Pilot', value: 'pilot' },
    { label: 'Co-Pilot', value: 'co_pilot' },
    { label: 'Senior Cabin Crew', value: 'senior_cabin_crew' },
    { label: 'Stweardess', value: 'stweardess' },
    { label: 'Mechanic', value: 'mechanic' },
  ]

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.crew = this.formBuilder.array([this.buildCrewMember()])
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      origin: ['',
        {
          validators: [Validators.required]
        }],
      destination: ['',
        {
          validators: [Validators.required]
        }],
      departureTime: ['',
        {
          validators: [Validators.required]
        }],
      returnTime: ['',
        {
          validators: [Validators.required]
        }],
      code: ['SK',
        {
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(7),
            FlightsValidators.code
          ]
        }],
      additionalInformation: '',
      withSKPlanesDiscount: false,
      crew: this.crew 
    })
  }

  setFlight(flight: Flight): void {
    this.crew.clear();
    const { key, ...formData } = flight;
    this.form.patchValue(formData);
    formData.crew?.forEach(crewMembers => this.addCrewMember(crewMembers));
  }

  buildCrewMember(crewMember: Crew = {} as Crew): FormGroup {
    return this.formBuilder.group({
      name: crewMember.name || '',
      job: crewMember.job || ''
    })
  }

  get crewMembers(): FormArray {
    return this.crew;
  }

  addCrewMember(crewMember?: Crew): void {
    this.crewMembers.push(this.buildCrewMember(crewMember));
  }

  removeCrewMember(idx: number): void {
    this.crewMembers.removeAt(idx);
  }
}
