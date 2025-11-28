import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '../../core/model/task';
import { TaskService } from '../../core/service/task.service';

@Component({
  selector: 'app-task',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.less'
})
export class TaskComponent implements OnInit, OnDestroy {

  taskService: TaskService = inject(TaskService);
  tasks$: Observable<Task[]> = this.taskService.tasks$;

  taskForm = new FormGroup({
    name: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

  addTask(): void {
    const form = this.taskForm.get('name')
    if (form?.value) {
      const title = form?.value
      this.taskService.addTask(title);
      form.setValue('')
    }
  }

  ngOnDestroy(): void {
  }
}
