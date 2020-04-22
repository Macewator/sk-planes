import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FlightsValidators {

    static code(control: AbstractControl): ValidationErrors | null{
        let input: string = control.value;
        const requiredPrefix: string = 'SK'
        const inputPrefix: boolean = input.startsWith(requiredPrefix, 0);

       return !!inputPrefix? null: {code: true};
    }
}