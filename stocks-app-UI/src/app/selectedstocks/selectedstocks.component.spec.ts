import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedstocksComponent } from './selectedstocks.component';

describe('SelectedstocksComponent', () => {
  let component: SelectedstocksComponent;
  let fixture: ComponentFixture<SelectedstocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedstocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedstocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
