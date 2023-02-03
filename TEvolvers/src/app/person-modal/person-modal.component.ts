import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../services/person.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.scss']
})
export class PersonModalComponent implements OnInit {

  personForm: FormGroup;

  gender: string[] = [
    'Female',
    'Male',
    'Others'
  ];

  constructor(
    private _fb: FormBuilder,
    private _personService: PersonService,
    private _dialogRef: MatDialogRef<PersonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _snackBarService: SnackbarService) {

    this.personForm = this._fb.group({
      id:new FormControl(0, [Validators.required]),
      name:new FormControl('', [Validators.required]),
      lastname:new FormControl('', [Validators.required]),
      datetime:new FormControl('', [Validators.required]),
      address:new FormControl('', [Validators.required]),
      gender:new FormControl('', [Validators.required]),
      age:new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.personForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.personForm.valid){

      if(this.data){
        console.log("Actualizo");

        this._personService.updatePerson(this.data.id, this.personForm.value).subscribe({
          next: (val: any)=>{
            //alert(`Person ${this.data.id} updated!`);
            this._snackBarService.openSnackBar(`Person ${this.data.id} updated!`);
            this._dialogRef.close(true);
          },
          error:(err: any)=>{
            console.log(err);
          },
        });
      }else{
        
        //console.log(this.personForm.value);
        this._snackBarService.openSnackBar('Person added successfully');
        this._dialogRef.close(true);

        this._personService.addPerson(this.personForm.value).subscribe({
          
          next: (val: any)=>{
            //alert('Person added successfully');
            //console.log("Agrego");
            this._snackBarService.openSnackBar('Person added successfully');
            this._dialogRef.close(true);
          },
          error:(err: any)=>{
            //console.log(err);
          },
        });
      }
      
    }else{
      console.log("Por favor, verificar los campos");
    }
  }
}
