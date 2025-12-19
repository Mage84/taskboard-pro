import { ComponentRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../core/model/task';
import { TaskService } from '../../core/service/task.service';
import { TaskHighlightComponent } from '../task-highlight/task-highlight.component';
import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockViewContainerRef: jasmine.SpyObj<ViewContainerRef>;
  let mockTasksSubject: BehaviorSubject<Task[]>;

  beforeEach(async () => {
    mockTasksSubject = new BehaviorSubject<Task[]>([]);

    mockTaskService = jasmine.createSpyObj('TaskService', ['addTask', 'removeTask'], {
      tasks$: mockTasksSubject.asObservable(),
    });
    mockViewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['clear', 'createComponent']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, TaskComponent, TaskHighlightComponent, RouterModule],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.container = mockViewContainerRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('scripts', () => {
    describe('addTask', () => {
      it('should not add task if form is empty', () => {
        component.taskForm.get('name')?.setValue('');
        component.addTask();
        expect(mockTaskService.addTask).not.toHaveBeenCalled();
      });

      it('should add task if form is valid', () => {
        const title = 'New Task';
        component.taskForm.get('name')?.setValue(title);
        component.addTask();
        expect(mockTaskService.addTask).toHaveBeenCalledWith(title);
        expect(component.taskForm.get('name')?.value).toBe('');
      });
    });

    describe('deleteTask', () => {
      it('should call removeTask with task id', () => {
        const taskId = 1;
        component.deleteTask(taskId);
        expect(mockTaskService.removeTask).toHaveBeenCalledWith(taskId);
      });
    });

    describe('highlight', () => {
      it('should clear container and create TaskHighlightComponent', () => {
        const task: Task = { id: 1, title: 'Test Task', completed: false };
        const mockComponentRef = {
          instance: { title: '' }
        } as unknown as ComponentRef<TaskHighlightComponent>;

        spyOn(component.container, 'clear')
        spyOn(component.container, 'createComponent').and.returnValue(mockComponentRef)

        component.highlight(task);

        expect(component.container.clear).toHaveBeenCalled();
        expect(component.container.createComponent).toHaveBeenCalled();
        expect(mockComponentRef.instance.title).toBe(task.title);
      });
    });
  });

  describe('DOM', () => {
    it('should render a list of tasks', () => {
      const mockTasks: Task[] = [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
      ];
      mockTasksSubject.next(mockTasks);
      fixture.detectChanges();

      const taskItems = fixture.debugElement.queryAll(By.css('.task-item'));
      expect(taskItems.length).toBe(2);
      expect(taskItems[0].nativeElement.textContent).toContain('Task 1');
      expect(taskItems[1].nativeElement.textContent).toContain('Task 2');
    });

    it('should call highlight() when "Mettre en avant" is clicked', () => {
      const mockTasks: Task[] = [{ id: 1, title: 'Task 1', completed: false }];
      mockTasksSubject.next(mockTasks);
      fixture.detectChanges();

      // Spy on the highlight method
      spyOn(component, 'highlight');

      // Find and click the "Mettre en avant" button
      const highlightButton = fixture.debugElement.query(By.css('button'));
      highlightButton.triggerEventHandler('click', null);

      // Verify highlight was called with the correct task
      expect(component.highlight).toHaveBeenCalledWith(mockTasks[0]);
    });

    it('should call deleteTask() when "Supprimer" is clicked', () => {
      const mockTasks: Task[] = [{ id: 1, title: 'Task 1', completed: false }];
      mockTasksSubject.next(mockTasks);
      fixture.detectChanges();

      // Spy on the deleteTask method
      spyOn(component, 'deleteTask');

      // Find and click the "Supprimer" button
      const deleteButtons = fixture.debugElement.queryAll(By.css('button'));
      deleteButtons[1].triggerEventHandler('click', null);

      // Verify deleteTask was called with the correct task ID
      expect(component.deleteTask).toHaveBeenCalledWith(mockTasks[0].id);
    });

    it('should call addTask() when the form is submitted', () => {
      // Spy on the addTask method
      spyOn(component, 'addTask');

      // Set a value in the form
      component.taskForm.get('name')?.setValue('New Task');
      fixture.detectChanges();

      // Find and click the "Ajouter une tâche" button
      const addButton = fixture.debugElement.query(By.css('.btn-primary'));
      addButton.triggerEventHandler('click', null);

      // Verify addTask was called
      expect(component.addTask).toHaveBeenCalled();
    });

    it('should update the form value when typing in the input', () => {
      // Find the input element
      const input = fixture.debugElement.query(By.css('input')).nativeElement;

      // Simulate typing
      input.value = 'New Task';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // Verify the form value is updated
      expect(component.taskForm.get('name')?.value).toBe('New Task');
    });

  })
});
