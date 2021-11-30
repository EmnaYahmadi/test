import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesListingComponent } from './movies-listing.component';

describe('MoviesListingComponent', () => {
  let component: MoviesListingComponent;
  let fixture: ComponentFixture<MoviesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
