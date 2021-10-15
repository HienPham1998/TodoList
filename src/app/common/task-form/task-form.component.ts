import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from 'src/app/task.service';
import { ToDoList } from 'src/app/todo-list/todo-list.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() indexEdit = -1;
  taskForm: FormGroup = new FormGroup({});
  errMessage = {
    title: '',
    dueDate: ''
  };
  todoList: ToDoList[] = [];
  unsubscribe$ = new Subject();

  constructor(private readonly fb: FormBuilder, private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [new Date().toISOString().slice(0, 10)],
      piority: [1]
    }
    );
  }

  validateForm() {
    const { title, dueDate } = this.taskForm.controls;
    if (title.errors && title.errors.required) {
      this.errMessage.title = '*Title is required';
    }

    const currentTime = new Date().getTime();
    console.log(new Date(dueDate.value).getTime())
    if (currentTime < new Date(dueDate.value).getTime()) {
      this.errMessage.dueDate = '*Due date must be greater than or equal to the current date';
    }
    return true;
  }

  resetError() {
    this.errMessage = {
      title: '',
      dueDate: ''
    };
  }

  addTask() {
    const result: boolean = this.validateForm();
    if (result) {
      this.resetError();
      const todoList: ToDoList[] = [...this.taskService.taskList$.value];
      todoList.push(this.taskForm.value);
      todoList.sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
      this.taskService.taskList$.next(todoList);
      this.initForm();
    }
  }

  updateTask() {

  }

  ngDoCheck() {
    if (this.indexEdit >= 0) {
      this.taskForm.patchValue(this.todoList[this.indexEdit]);
    }
  }

}
