import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePlantPage } from './create-plant.page';

describe('CreatePlantPage', () => {
  let component: CreatePlantPage;
  let fixture: ComponentFixture<CreatePlantPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreatePlantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
