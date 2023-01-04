import {
  TaskDialogComponent,
  TaskDialogResult,
} from './task-dialog/task-dialog.component';
import { Component } from '@angular/core';
import { createTask, Task } from './task/task';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todoTasks: Observable<Task[]>;
  inProgressTasks: Observable<Task[]>;
  doneTasks: Observable<Task[]>;

  constructor(private dialog: MatDialog, private store: AngularFirestore) {
    this.todoTasks = this.store
      .collection<Task>('tasks', (ref) => ref.where('status', '==', 'todo'))
      .valueChanges({ idField: 'id' });
    this.inProgressTasks = this.store
      .collection<Task>('tasks', (ref) =>
        ref.where('status', '==', 'inProgress')
      )
      .valueChanges({ idField: 'id' });
    this.doneTasks = this.store
      .collection<Task>('tasks', (ref) => ref.where('status', '==', 'done'))
      .valueChanges({ idField: 'id' });
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {
        task: {},
        enableDelete: false,
      },
    });

    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (result) {
        // create a new task object with the default value set for the status field

        const task = createTask(
          result.task.title,
          result.task.description,
          result.task.image_url,
          result.task.status
        );
        console.log(task);
        this.store.collection('tasks').doc(task.id).set(task);
      }
    });
  }

  //method to edit the task after receiving the task from the child component
  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {
        task,
        enableDelete: true,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        // update the task in the database
        console.log(task);
        this.store.collection('tasks').doc(task.id).update(task);
        console.log(task);
      });
  }

  //method to delete the task after receiving the task from the child component with the delete button
  deleteTask(task: Task): void {
    if (!task) {
      return;
    }
    // delete the task from the database
    this.store.collection('tasks').doc(task.id).delete();
  }

  toggleStatus(task: Task) {
    console.log(task.status);
    switch (task.status) {
      case 'todo':
        task.status = 'inProgress';
        break;
      case 'in progress':
        task.status = 'done';
        break;
      case 'done':
        task.status = 'todo';
        break;
    }
    console.log(task.status);
    this.store.collection('tasks').doc(task.id).update(task);
    console.log(task.status);
  }
}
