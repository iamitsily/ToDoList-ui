import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPagComponent } from './settings-pag.component';

describe('SettingsPagComponent', () => {
  let component: SettingsPagComponent;
  let fixture: ComponentFixture<SettingsPagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsPagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsPagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
