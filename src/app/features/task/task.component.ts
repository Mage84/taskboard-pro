import { AsyncPipe } from '@angular/common';
import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '../../core/model/task';
import { TaskService } from '../../core/service/task.service';
import { TaskHighlightComponent } from '../task-highlight/task-highlight.component';

@Component({
  selector: 'app-task',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.less',
})
export class TaskComponent {
  @ViewChild('highlightContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  taskService: TaskService = inject(TaskService);
  tasks$: Observable<Task[]> = this.taskService.tasks$;

  taskForm = new FormGroup({
    name: new FormControl()
  });

  constructor() { }

  addTask(): void {
    const form = this.taskForm.get('name')
    if (form?.value) {
      const title = form?.value
      this.taskService.addTask(title);
      form.setValue('')
    }
  }

  deleteTask(id: number): void {
    this.taskService.removeTask(id)
  }

  highlight(task: Task) {
    // Efface le contenu précédent
    this.container.clear();

    // Crée le composant TaskHighlight
    const ref = this.container.createComponent(TaskHighlightComponent);

    // Passe les données au composant
    ref.instance.title = task.title;
  }
}
