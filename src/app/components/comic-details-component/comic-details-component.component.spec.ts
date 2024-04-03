import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicDetailsComponent } from './comic-details-component.component';

describe('ComicDetailsComponentComponent', () => {
  let component: ComicDetailsComponent;
  let fixture: ComponentFixture<ComicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComicDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
