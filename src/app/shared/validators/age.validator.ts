import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ageValidator(minimum: number = 18): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const now = new Date();
    const birthDate = new Date(control.value);

    let age = now.getFullYear() - birthDate.getFullYear();

    if (
      (now.getMonth() < birthDate.getMonth()) ||
      (now.getMonth() == birthDate.getMonth() && now.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    if (age < minimum)
      console.log("trop jeune");
      return { age: `Vous êtes trop jeune par rapport à l'âge minimum (${minimum}).` };

    return null;
  };

}