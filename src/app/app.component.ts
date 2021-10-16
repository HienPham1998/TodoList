import { Component } from '@angular/core';
import { TODO_LIST } from './app.const';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly taskService: TaskService) { }

  ngOnInit() {
    this.setValueListTask();
  }

  setValueListTask() {
    const list = localStorage.getItem(TODO_LIST);
    if (list) {
      this.taskService.taskList$.next(JSON.parse(list));
    }
  }

  onClickDone() {

  }

  onBulkRemove() {

  }
}
