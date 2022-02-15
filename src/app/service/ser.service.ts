import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SerService {
 public dat = `${new Date().getHours()}:${new Date().getMinutes()}`;
 public users = [
  {
    id: Math.floor(Math.random() * 1000),
    userName: 'ivan',
    email: 'ivan@gmail.com',
    password: 'ivan1234',
  }
];
 public blogs = [
    {
      id: Math.floor(Math.random() * 1000),
      postedBy: 'Admin',
      topic: 'first post',
      data: `${new Date().getHours()}:${new Date().getMinutes()}`,
      message: 'Sign up to create your account and start to use Angular'
    }
  ];
  constructor() { }

  getDiscounts(): Array<any> {
    return this.blogs;
  }

  addPost(blog: any): void {
    this.blogs.push(blog);
  }
  deletePost(id: number): void {
    this.blogs.splice(id, 1);
  }
  EditPost(dis: any, id: number): void {
    this.blogs.splice(id, 1, dis);
  }
  addUser(user: any): void {
    this.users.push(user);
  }
 
}
