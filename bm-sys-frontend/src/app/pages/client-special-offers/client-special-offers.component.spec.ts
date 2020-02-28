import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSpecialOffersComponent } from './client-special-offers.component';

describe('ClientSpecialOffersComponent', () => {
  let component: ClientSpecialOffersComponent;
  let fixture: ComponentFixture<ClientSpecialOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSpecialOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSpecialOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
