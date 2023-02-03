import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PersonModalDeleteComponent } from './person-modal-delete/person-modal-delete.component';
import { PersonModalComponent } from './person-modal/person-modal.component';
import { PersonService } from './services/person.service';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TEvolvers';

  pages:any[] = [];
  counter:number = 1;
  id:number = 1;

  displayedColumns: string[] = [
    'id',
    'name',
    'lastname',
    'datetime',
    'address',
    'gender',
    'age',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _modal: MatDialog,
    private _personService: PersonService,
    private _snackBarService: SnackbarService){

  }

  ngOnInit(): void {
    this.getPeopleList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openModal(){
    //Abre la modal y le cambia el tamaño predeterminado
    const modal = this._modal.open(PersonModalComponent,{
        width: '800px'
      });

    //Una vez se cierra la modal, trae nuevamente las personas 
    modal.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getPeopleList();
        }
      }
    });
  }

  getPeopleList(){
    this.pages = [];
    this.counter = 1;
    this.id = 1;

    this._personService.getPeopleList().subscribe({
      next:(res)=>{

        this.counter = Math.ceil((res.result.length) / 10);

        for (let i = 0; i < this.counter; i++) {
          const page: any = {
            page: this.id
          };
          
          this.pages.push(page);
          this.id++;
        }

      },
      error:(err)=>{
        console.log(err);
      }
    });

    this._personService.getPeoplePage(1).subscribe({
      next:(res)=>{
        //console.log(res);
        this.dataSource = new MatTableDataSource(res.result);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }


  deletePerson(id:number){
    this._personService.deletePerson(id).subscribe({
      next:(res)=>{
        //alert('Person deleted!');
        this._snackBarService.openSnackBar('Person deleted!', 'done');
        this.getPeopleList();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }


  openEditForm(data:any){
    const modal = this._modal.open(PersonModalComponent,{
      width:'800px',
      data
    });

    //Cuando se cierre la modal, actualiza la información de la tabla
    modal.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getPeopleList();
        }
      }
    });
  }

  openDeleteForm(data:any){
    const modal = this._modal.open(PersonModalDeleteComponent,{
      width:'800px',
      data
    });

    //Cuando se cierre la modal, actualiza la información de la tabla
    modal.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getPeopleList();
        }
      }
    });
  }

  peoplePage(page:any){
    this._personService.getPeoplePage(page).subscribe({
      next:(res)=>{
        //console.log(res);
        this.dataSource = new MatTableDataSource(res.result);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

}
