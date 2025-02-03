import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmAuthFormComponent } from './firm-auth-form.component';

describe('FirmAuthFormComponent', () => {
  let component: FirmAuthFormComponent;
  let fixture: ComponentFixture<FirmAuthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirmAuthFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmAuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
