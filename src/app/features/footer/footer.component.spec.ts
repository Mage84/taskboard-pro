import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, RouterModule.forRoot([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentYear to the current year', () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    expect(component.currentYear).toBe(currentYear);
  });


  it('should render the current year in the copyright text', () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const copyrightElement = fixture.debugElement.query(By.css('.copyright'));

    expect(copyrightElement).toBeTruthy();
    expect(copyrightElement.nativeElement.textContent).toContain(currentYear);
    expect(copyrightElement.nativeElement.textContent).toContain('Task Boards co. ltd.');
    expect(copyrightElement.nativeElement.textContent).toContain('All rights reserved.');
  });
});
