import { TestBed } from '@angular/core/testing';

import { Task } from '../model/task';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  const mockTasks: Task[] = []

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [

      ]
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default tasks', (done) => {
    service.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(3);
      expect(tasks[0].title).toBe('préparer un cours Angular');
      expect(tasks[1].title).toBe('relire le module RxJS');
      expect(tasks[2].title).toBe('Corriger les TPs');
      done();
    });
  });

  it('should add a new task', (done) => {
    const newTaskTitle = 'New Task';
    service.addTask(newTaskTitle);

    service.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(4);
      expect(tasks[3].title).toBe(newTaskTitle);
      done();
    });
  });

  it('should remove a task', (done) => {
    const taskIdToRemove = 1;
    service.removeTask(taskIdToRemove);

    service.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks.some(task => task.id === taskIdToRemove)).toBeFalse();
      done();
    });
  });

  it('should return the last task ID', () => {
    const lastTaskId = service.getLastTaskId();
    expect(lastTaskId).toBe(3);
  });

  it('should return the current list of tasks', () => {
    const tasks = service.getTasks();
    expect(tasks.length).toBe(3);
    expect(tasks[0].title).toBe('préparer un cours Angular');
  });

  it('should toggle the completed status of a task', (done) => {
    const taskIdToToggle = 1;
    service.toggleTask(taskIdToToggle);

    service.tasks$.subscribe(tasks => {
      const toggledTask = tasks.find(task => task.id === taskIdToToggle);
      expect(toggledTask?.completed).toBeTrue();
      done();
    });
  });

  it('should clear all tasks', (done) => {
    service.clearTasks();

    service.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(0);
      done();
    });
  });

});
