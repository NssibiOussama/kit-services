import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthertSkillsComponent } from './othert-skills.component';

describe('OthertSkillsComponent', () => {
  let component: OthertSkillsComponent;
  let fixture: ComponentFixture<OthertSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OthertSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OthertSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
