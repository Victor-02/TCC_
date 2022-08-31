import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionalDialogComponent } from './profissional-dialog.component';

describe('ProfissionalDialogComponent', () => {
  let component: ProfissionalDialogComponent;
  let fixture: ComponentFixture<ProfissionalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfissionalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
