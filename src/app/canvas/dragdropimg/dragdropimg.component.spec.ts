import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragdropimgComponent } from './dragdropimg.component';

describe('DragdropimgComponent', () => {
  let component: DragdropimgComponent;
  let fixture: ComponentFixture<DragdropimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragdropimgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragdropimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
