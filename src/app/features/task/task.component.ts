import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../core/model/task';
import { TaskService } from '../../core/service/task.service';

@Component({
  selector: 'app-task',
  imports: [AsyncPipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.less'
})
export class TaskComponent implements OnInit, OnDestroy {

  taskService: TaskService = inject(TaskService);
  tasks$: Observable<Task[]> = this.taskService.tasks$;

  constructor() { }

  ngOnInit(): void {
  }

  addTask(title: string): void {
    this.taskService.addTask(title);
  }

  ngOnDestroy(): void {
  }
}
