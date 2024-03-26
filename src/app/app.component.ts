import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NoSpaceBarValidator } from './shared/validators/noSpaceBar';
import { EmpIdValidators } from './shared/validators/empIdValidators';
import { COUNTRIES_META_DATA } from './shared/const/counteriesData';
import { CustomRegex } from './shared/const/validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'reactiveForm';
  
  // checked : boolean = false;
  countriesArray = COUNTRIES_META_DATA;
  signUpForms !: FormGroup;
  gendersArray : Array<string> = ['female', 'male', 'others']

  ngOnInit(): void {
      this.createSignUpForm();
      this.currentAndPermAdd()
      
      this.f['password']
        .valueChanges
          .subscribe(res =>{
            console.log(this.f['password'].valid);
            if(this.f['password'].valid){
              this.f['confirmPassword'].enable()
            }else{
              this.f['confirmPassword'].disable()
            }
          })
  }
  createSignUpForm(){
    this.signUpForms = new FormGroup({
      userName : new FormControl
      (null,[Validators.required, Validators.minLength(5),
      Validators.maxLength(10), NoSpaceBarValidator.noSpaceBar]),
      email : new FormControl(null,[Validators.required, Validators.pattern(CustomRegex.email)]),
      skills : new FormArray([new FormControl(null,[Validators.required])]),
      gender : new FormControl(null,[Validators.required]),
      empId : new FormControl(null, [Validators.required, EmpIdValidators.isEmpIdValid]),
      password : new FormControl(null,[Validators.required, Validators.pattern(CustomRegex.password)]),
      confirmPassword : new FormControl({value : null, disabled : true},[Validators.required]),
      PermanentAddress : new FormGroup({
        countryName : new FormControl(null),
        state : new FormControl(null),
        city : new FormControl(null),
        zipCode : new FormControl(null)
      }),
      currentAddress : new FormGroup({
        countryName : new FormControl(null),
        state : new FormControl(null),
        city : new FormControl(null),
        zipCode : new FormControl(null)
      }),
      isCurrentAndPerSame : new FormControl(false)
    })
  }
  onSignUp(){
    if(this.signUpForms.valid && (this.f['password'].value === this.f['confirmPassword'].value))
    console.log(this.signUpForms.value);
    
  }

  currentAndPermAdd(){
    this.f['isCurrentAndPerSame']
        .valueChanges
          .subscribe((res =>{
            // console.log(`value of address checkbox is change to: ${res}`);
            if(res){
              // console.log(`value of address checkbox ${res}`)
              let getPermAddVal = this.f['PermanentAddress'].value;
              console.log(getPermAddVal);
              this.getCurrentAdd.setValue(getPermAddVal)
              Object.keys(this.getCurrentAdd.controls).forEach(ele =>{
                this.getCurrentAdd.get(ele)?.disable()
              })
            }else{
              Object.keys(this.getCurrentAdd.controls).forEach(ele =>{
                this.getCurrentAdd.get(ele)?.enable();
                this.getCurrentAdd.reset()
              })
            }
          }))
  }

  get getCurrentAdd(){
    return this.signUpForms.get('currentAddress') as FormGroup;
  }
  get f(){
    return this.signUpForms.controls
  }
  get getSkillsArray(){
    return this.signUpForms.get('skills') as FormArray
  }
  onAddSkills(){
    if(this.getSkillsArray.length < 5){
      let createControl = new FormControl(null, [Validators.required]);
      this.getSkillsArray.push(createControl);
    }
  }
  onremoveSkill(index : number){
  console.log(index);
    this.getSkillsArray.removeAt(index)
  }
}
