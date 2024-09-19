import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteListPageComponent } from './note-list-page.component';

describe('NoteListPageComponent', () => {
  let component: NoteListPageComponent;
  let fixture: ComponentFixture<NoteListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
