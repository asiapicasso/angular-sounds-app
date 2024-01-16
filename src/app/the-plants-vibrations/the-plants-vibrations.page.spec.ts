import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThePlantsVibrationsPage } from './the-plants-vibrations.page';

describe('ThePlantsVibrationsPage', () => {
  let component: ThePlantsVibrationsPage;
  let fixture: ComponentFixture<ThePlantsVibrationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ThePlantsVibrationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
