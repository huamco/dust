import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {

  private _todoList = [
    { text: 'Check me out' },
    { text: 'Curabitur dignissim nunc a tellus euismod, quis pretium ipsum convallis'},
    { text: 'Vivamus dapibus pulvinar ipsum, sit amet elementum sapien tincidunt non'},
    { text: 'Praesent viverra nisl a pharetra viverra'}
  ];

  getTodoList() {
    return this._todoList;
  }
}
