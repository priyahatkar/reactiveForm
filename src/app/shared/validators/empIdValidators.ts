import { AbstractControl, ValidationErrors } from "@angular/forms";





export class EmpIdValidators{
    static isEmpIdValid(control : AbstractControl): null | ValidationErrors{
        let val = control.value as string;

        if(val){
            let regexp = /^[a-z]\d{3}$/i;

            let isValid = regexp.test(val);
            return isValid ? null : {invalidEmpId : `emp Id should starts with 1 alphabet and ends with 3 numbers`}
            // if(isValid){
            //     return null
            // }else{
            //     return {invalidEmpId : `emp Id should starts with 1 alphabet and ends with 3 numbers`}
            // }
        }else{
            return null
        }
    }
}