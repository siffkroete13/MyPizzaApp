import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messages: string[] = [];

  public set(message: string) {
    this.clear();
    this.add(message);
  }

  public add(message: string) {
    this.messages.push(message);
  }

  public clear() {
    this.messages = [];
  }
}
