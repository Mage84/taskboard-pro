import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-highlight',
  imports: [],
  templateUrl: './task-highlight.component.html',
  styleUrl: './task-highlight.component.less'
})
export class TaskHighlightComponent {
  @Input() title = ''; // le composant peut recevoir une donnée (le titre ici)
}
