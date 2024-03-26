import { AbstractControl, ValidationErrors } from "@angular/forms";



export class NoSpaceBarValidator{
    static noSpaceBar(control : AbstractControl): null | ValidationErrors{
        let val = control.value as string;
        if(!val){
            return null;
        }
        if(val.includes(' ')){
            return{noSpaceError : 'Space is not allowed'}
        }else{
            return null
        }
    }
}