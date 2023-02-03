import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonModalDeleteComponent } from './person-modal-delete.component';

describe('PersonModalDeleteComponent', () => {
  let component: PersonModalDeleteComponent;
  let fixture: ComponentFixture<PersonModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonModalDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
