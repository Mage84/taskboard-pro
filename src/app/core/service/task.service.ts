import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private tasks: Task[] = [
    { id: 1, title: 'préparer un cours Angular', completed: false },
    { id: 2, title: "relire le module RxJS", completed: false },
    { id: 3, title: 'Corriger les TPs', completed: false },
  ];

  private taskSubject: BehaviorSubject<Task[]> = new BehaviorSubject(this.tasks)
  tasks$ = this.taskSubject.asObservable()

  addTask(title: string): number {
    const id = this.getLastTaskId() + 1
    const newTask: Task = { id: id, title: title, completed: false };
    this.tasks.push(newTask);
    this.taskSubject.next(this.tasks);
    return id;
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter(task =>
      task.id !== id
    )
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

  getTasks(): Task[] {
    return this.taskSubject.value;
  }

  toggleTask(id: number): void {
    const task = this.tasks.find((task) => {
      task.id === id
    })
    if (task) {
      task.completed = true
    }
  }

  clearTasks(): void {
    this.taskSubject.next([]);
  }
}
