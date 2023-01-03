import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';
import { Component } from '@angular/core';
import { createTask, Task } from './task/task';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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
    this.todoTasks = this.store.collection<Task>('tasks', ref => ref.where('status', '==', 'todo')).valueChanges();
    this.inProgressTasks = this.store.collection<Task>('tasks', ref => ref.where('status', '==', 'inProgress')).valueChanges();
    this.doneTasks = this.store.collection<Task>('tasks', ref => ref.where('status', '==', 'done')).valueChanges();
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
      const task = createTask(result.task.title, result.task.description, result.task.image_url, result.task.id);
      this.store.collection('tasks').add(task);
      }
    });
  }

}
