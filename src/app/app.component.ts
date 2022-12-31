import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task } from './task/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tasker';
  
  todo: Task[] = [
    {
      title: 'Task 1',
      description: 'Go to the store and buy milk',
},
    {
      title: 'Task 2',
      description: 'Go to the store and buy bread',
},
  ];
  inProgress: Task[] = [];
  done: Task[] = [];

  editTask(list: string, task: Task): void {}

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return
    }
    if (!event.container.data || !event.previousContainer.data) {
      return
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
    // moveItemInArray(this.todo, event.previousIndex,event.currentIndex)
  }
}
