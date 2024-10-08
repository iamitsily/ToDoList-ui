import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfleComponent } from './profle.component';

describe('ProfleComponent', () => {
  let component: ProfleComponent;
  let fixture: ComponentFixture<ProfleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
