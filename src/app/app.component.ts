import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task } from './task/task';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tasker';

  constructor(private dialog: MatDialog) {}
  
  todo: Task[] = [
    {
      title: 'Task 1',
      description: 'Go to the store and buy milk',
      image_url: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
},
    {
      title: 'Task 2',
      description: 'Go to the store and buy bread',
      image_url: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
},
  ];
  inProgress: Task[] = [];
  done: Task[] = [];
  //receive the task from the child component for editing
  editTask(list: string, task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        task: task,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult | undefined) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.deleteTask(list, task);
      }
    });
  }

  //receive the task from the child component for deletion
  deleteTask(list: string, task: Task): void {
    if (list === 'todo') {
      this.todo = this.todo.filter((t) => t !== task);
    } else if (list === 'inProgress') {
      this.inProgress = this.inProgress.filter((t) => t !== task);
    } else if (list === 'done') {
      this.done = this.done.filter((t) => t !== task);
    }
  }

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

  //create a new task
  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      
      data: {
        task: {},
        },
        });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult | undefined) => {
      if (!result) {
        return;
      }
      this.todo.push(result.task);
    });
  }

  //edit a task
  
}
