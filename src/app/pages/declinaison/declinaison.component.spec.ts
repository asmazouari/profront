import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinaisonComponent } from './declinaison.component';

describe('DeclinaisonComponent', () => {
  let component: DeclinaisonComponent;
  let fixture: ComponentFixture<DeclinaisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclinaisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinaisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
