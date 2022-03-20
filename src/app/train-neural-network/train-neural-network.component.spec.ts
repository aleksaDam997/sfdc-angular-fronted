import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainNeuralNetworkComponent } from './train-neural-network.component';

describe('TrainNeuralNetworkComponent', () => {
  let component: TrainNeuralNetworkComponent;
  let fixture: ComponentFixture<TrainNeuralNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainNeuralNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainNeuralNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
