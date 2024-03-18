import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsPageComponent } from './comics-page.component';

describe('ComicsPageComponent', () => {
  let component: ComicsPageComponent;
  let fixture: ComponentFixture<ComicsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComicsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComicsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
