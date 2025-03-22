import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestFeaturesComponent } from './latest-features.component';

describe('LatestFeaturesComponent', () => {
  let component: LatestFeaturesComponent;
  let fixture: ComponentFixture<LatestFeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LatestFeaturesComponent]
    });
    fixture = TestBed.createComponent(LatestFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
