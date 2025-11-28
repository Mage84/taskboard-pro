import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private tasks: Task[] = [
    { id: 1, title: 'préparer un cours Angular' },
    { id: 2, title: "relire le module RxJS" },
    { id: 3, title: 'Corriger les TPs' },
  ];

  private taskSubject: BehaviorSubject<Task[]> = new BehaviorSubject(this.tasks)
  tasks$ = this.taskSubject.asObservable()

  addTask(title: string): void {
    const newTask: Task = { id: this.getLastTaskId() + 1, title: title };
    this.tasks.push(newTask);
    this.taskSubject.next(this.tasks);
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter((task) => {
      task.id !== id
    })
    this.taskSubject.next(this.tasks)
  }

  getLastTaskId(): number {
    let maxId = this.tasks[0].id;
    this.tasks.forEach((task) => {
      if (task.id > maxId) {
        maxId = task.id
      }
    })
    return maxId;
  }
}
