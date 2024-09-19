import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDetailsPageComponent } from './note-details-page.component';

describe('NoteDetailsPageComponent', () => {
  let component: NoteDetailsPageComponent;
  let fixture: ComponentFixture<NoteDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
