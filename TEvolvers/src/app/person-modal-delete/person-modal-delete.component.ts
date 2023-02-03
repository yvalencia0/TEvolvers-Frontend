import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonModalComponent } from '../person-modal/person-modal.component';
import { PersonService } from '../services/person.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-person-modal-delete',
  templateUrl: './person-modal-delete.component.html',
  styleUrls: ['./person-modal-delete.component.scss']
})
export class PersonModalDeleteComponent implements OnInit {

  personForm: FormGroup;
  
  constructor(
    private _fb: FormBuilder,
    private _personService: PersonService,
    private _dialogRef: MatDialogRef<PersonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _snackBarService: SnackbarService
  ) {

    this.personForm = this._fb.group({
      id:new FormControl('',),
      name:new FormControl('',),
      lastname:new FormControl('',)
    });
  }

  ngOnInit(): void {
    this.personForm.patchValue(this.data);
  }

  onFormDeleteSubmit(){
    this._personService.deletePerson(this.data.id).subscribe({
      next: (val: any)=>{
        //alert(`Person ${this.data.id} updated!`);
        this._snackBarService.openSnackBar(`Person ${this.data.id} delete!`);
        this._dialogRef.close(true);
      },
      error:(err: any)=>{
        console.log(err);
      },
    });
  }

}
