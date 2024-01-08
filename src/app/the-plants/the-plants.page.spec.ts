import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThePlantsPage } from './the-plants.page';

describe('ThePlantsPage', () => {
  let component: ThePlantsPage;
  let fixture: ComponentFixture<ThePlantsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ThePlantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
