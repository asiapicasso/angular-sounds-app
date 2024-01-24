import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateVibrationPage } from './create-vibration.page';

describe('CreateVibrationPage', () => {
  let component: CreateVibrationPage;
  let fixture: ComponentFixture<CreateVibrationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateVibrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
