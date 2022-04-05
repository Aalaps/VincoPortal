import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisedPageContentComponent } from './authorised-page-content.component';

describe('AuthorisedPageContentComponent', () => {
  let component: AuthorisedPageContentComponent;
  let fixture: ComponentFixture<AuthorisedPageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorisedPageContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisedPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
