import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoDialogComponent } from './servico-dialog.component';

describe('ServicoDialogComponent', () => {
  let component: ServicoDialogComponent;
  let fixture: ComponentFixture<ServicoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
