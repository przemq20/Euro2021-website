import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureMatchesComponent } from './future-matches.component';

describe('FutureMatchesComponent', () => {
  let component: FutureMatchesComponent;
  let fixture: ComponentFixture<FutureMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
