import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormUtils {
  public static validateForm(form: FormGroup | FormControl): boolean {
    if (form instanceof FormControl) {
        if (form.invalid) {
            form.markAsDirty();
            form.markAsTouched();
            form.updateValueAndValidity({ onlySelf: true });
        }

        return form.valid;
    }

    if (!form.controls) {
      return form.valid;
    }

    Object.values(form.controls).forEach((control: AbstractControl) => {
      if (control.invalid) {
        control.markAsDirty();
        control.markAsTouched();
        control.updateValueAndValidity({ onlySelf: true });
      }

      if (control instanceof FormArray) control.controls.forEach((form: AbstractControl) => !FormUtils.validateForm(form as FormGroup));
    });

    return form.valid;
  }
}