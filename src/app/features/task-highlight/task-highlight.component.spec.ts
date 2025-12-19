import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { TaskHighlightComponent } from './task-highlight.component';

describe('TaskHighlightComponent', () => {
  let component: TaskHighlightComponent;
  let fixture: ComponentFixture<TaskHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskHighlightComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default empty title', () => {
    expect(component.title).toBe('');
  });

  it('should display the input title in the template', () => {
    // Set the input value
    const testTitle = 'Test Highlight Title';
    component.title = testTitle;

    // Trigger change detection
    fixture.detectChanges();

    // Get the rendered element
    const titleElement = fixture.debugElement.query(By.css('.task-highlight'));
    // Verify the rendered content
    expect(titleElement.nativeElement.textContent).toContain(testTitle);
  });

  it('should update the displayed title when the input changes', () => {
    // Initial title
    component.title = 'Initial Title';
    fixture.detectChanges();
    let titleElement = fixture.debugElement.query(By.css('.task-highlight'));
    expect(titleElement.nativeElement.textContent).toContain('Initial Title');

    // Updated title
    component.title = 'Updated Title';
    fixture.detectChanges();
    titleElement = fixture.debugElement.query(By.css('.task-highlight'));
    expect(titleElement.nativeElement.textContent).toContain('Updated Title');
  });

});
