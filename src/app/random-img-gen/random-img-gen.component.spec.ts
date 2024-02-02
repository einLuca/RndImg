import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomImgGenComponent } from './random-img-gen.component';

describe('RandomImgGenComponent', () => {
  let component: RandomImgGenComponent;
  let fixture: ComponentFixture<RandomImgGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomImgGenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomImgGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
