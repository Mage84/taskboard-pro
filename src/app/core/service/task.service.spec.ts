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

  it('devrait ajouter une tâche correctement', () => {
    // ACT : on ajoute une tâche
    service.addTask('Apprendre Angular');

    // ASSERT : la tâche doit être dans la liste
    const tasks = service.getTasks();
    expect(tasks.length).toBe(4);
    expect(tasks[0].title).toBe('Apprendre Angular');
  });

  it('devrait supprimer une tâche', () => {
    const taskId = service.addTask('Tâche temporaire');

    service.removeTask(taskId);

    expect(service.getTasks().length).toBe(0);
  });

  it('devrait marquer une tâche comme terminée', () => {
    const taskId = service.addTask('Tâche à terminer');

    service.toggleTask(taskId);

    const task = service.getTasks()[0];
    expect(task.completed).toBe(true);
  });
});
