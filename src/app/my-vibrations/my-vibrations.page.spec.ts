import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyVibrationsPage } from './my-vibrations.page';

describe('MyVibrationsPage', () => {
  let component: MyVibrationsPage;
  let fixture: ComponentFixture<MyVibrationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyVibrationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
