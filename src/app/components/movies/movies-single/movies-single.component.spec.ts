import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesSingleComponent } from './movies-single.component';

describe('MoviesSingleComponent', () => {
  let component: MoviesSingleComponent;
  let fixture: ComponentFixture<MoviesSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
