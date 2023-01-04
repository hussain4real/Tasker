import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
  // @Output() delete = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  //send the task to the parent component
  onEdit(): void {
    if (!this.task) {
      return;
    }
    console.log('hello');
    this.edit.emit(this.task);
  }

  //method to delete the task
  deleteTask(): void {
    if (!this.task) {
      return;
    }
    this.delete.emit(this.task);
    console.log('task deleted successfully');
  }
}
