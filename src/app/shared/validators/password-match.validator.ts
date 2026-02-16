import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(
  passwordFieldName: string = "password",
  confirmPasswordFieldName: string = "confirmPassword"
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const password: FormControl = control.get(passwordFieldName) as FormControl;
    const confirmPassword: FormControl = control.get(confirmPasswordFieldName) as FormControl;

    if (password.value !== confirmPassword.value) {
      return { passwordMismatch: 'La combinaison de mot de passe est incorrect.' };
    }

    return null
  };

}