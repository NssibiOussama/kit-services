import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardskillsComponent } from './hardskills.component';

describe('HardskillsComponent', () => {
  let component: HardskillsComponent;
  let fixture: ComponentFixture<HardskillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HardskillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HardskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
