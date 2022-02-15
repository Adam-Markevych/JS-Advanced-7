import { Component, OnInit } from '@angular/core';
import { SerService } from 'src/app/service/ser.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {

  public data = this.SerService.dat;

  public userregxp: RegExp = /^[a-zA-z]{3,16}$/; 
  public passregxp: RegExp = /^[a-zA-Z0-9_]{4,16}$/;
  public emailregxp: RegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  public userExp: any; 
  public passExp: any;
  public emailExp: any;


  public blog = this.SerService.blogs;
  public user = this.SerService.users;

  public saveName!:string;
  public saveIndex!: number;

  public block_btnsAdmin = false;
  public block_btnsUser = false;
  public menu1 = true;
  public menu2 = false;
  public block_signin = false;
  public block_Add = false;
  public block_back = false;
  public signIn_email: any;
  public signIn_password: any;
  public signIn_username: any;

  public usName = false;
  
  public sumUser = false;
  public sumAdmin = false;

  public siIn = false;
  public siUp = false;

  public disabledSubmit = true;
  public disabledSubmit1 = true;

  public title!: string;
  public text!: string;
  public postBy!: string;

  public post = false;
  public edit_Post = false;

  constructor(private SerService: SerService) { }

  ngOnInit(): void {
    console.log(this.SerService.blogs)
  }

  checkUserName(): void {
    this.userExp = this.userregxp.test(this.signIn_username);
    if(this.userExp){
      this.disabledSubmit = false;
      this.disabledSubmit1 = false;
    } 
    else {
      this.disabledSubmit = true;
      this.disabledSubmit1 = true;
    }
  }
   checkPassword(): void {
    this.passExp = this.passregxp.test(this.signIn_password);
    if(this.passExp){
     this.disabledSubmit = false;
     this.disabledSubmit1 = false;
    } 
    else {
      this.disabledSubmit = true;
      this.disabledSubmit1 = true;
    }
  }
  checkEmail(): void{
    this.emailExp = this.emailregxp.test(this.signIn_email);
    if(this.emailExp){
      this.disabledSubmit = false;
      this.disabledSubmit1 = false;
     
    } 
    else {
      this.disabledSubmit = true;
      this.disabledSubmit1 = true;
    }
  }
  btnSignIn(): void {
    this.block_signin = true;
    this.block_back = true;
    this.siIn = true;
    this.sumAdmin = true;
  }
  btnSignUp(): void {
    this.sumUser = true;
    this.block_signin = true;
    this.block_back = true;
    this.usName = true;
    this.siUp = true
    this.sumUser = true;
  }
  btnClose(): void {
    this.block_signin = false;
    this.block_back = false;
    this.block_Add = false;
    this.post = false;
    this.edit_Post = false;
    this.siIn = false;
    this.siUp = false;
    this.sumUser = false;
    this.sumAdmin = false;
    this.usName = false;
    this.title = '';
    this.text = '';
    this.signIn_username = '';
    this.signIn_password = '';
    this.signIn_email = '';
  }

  btnSubmit(): void {
  if(this.signIn_email != '' && this.signIn_password != '' &&
    this.emailExp && this.passExp){
      this.disabledSubmit = false;
      if(this.signIn_email == 'admin@gmail.com' && this.signIn_password == 'admin') {
        this.block_signin = false;
        this.block_back = false;
        this.menu2 = true;
        this.menu1 = false;
        this.block_btnsAdmin = true;
        this.signIn_email = '';
        this.signIn_password = '';
        this.siIn = false;
        this.siUp = false;
        this.saveName = 'admin';
        this.sumAdmin = false;
      }else{
        this.disabledSubmit = true;
        alert('Неправельно введено пароль або пошту');
      }
    }else{
      this.disabledSubmit = true;

    }
   
  }
  btnSignOut(): void {
    this.block_btnsAdmin = false;
    this.saveName = '';
    this.menu2 = false;
    this.menu1 = true;
    console.log(this.saveName);
  }
  btnAddPost(): void{
    this.block_Add = true;
    this.block_back = true;
    this.post = true;
  }
  btnPost(): void {
    if(this.title.length === 0 || this.text.length === 0){
      alert('Заповніть всі поля!!!');
    }else{
      let obj = {
        id: 1,
        postedBy: this.saveName, 
        topic: this.title,
        data: this.data,
        message: this.text
      }
    
      this.SerService.addPost(obj);
      this.block_Add = false;
      this.block_back = false;
      this.post = false;
      this.title = '';
      this.text = '';
      this.sumUser = false;
    }
   
  }
  btnSubmitUser(): void {
    if(this.signIn_email != '' && this.signIn_password != '' && this.signIn_username != '' &&
    this.emailExp && this.passExp && this.userExp){
      this.disabledSubmit1 = false;
      if(this.user.find(name => name.userName == this.signIn_username || name.email == this.signIn_email)){
        this.disabledSubmit1 = true;
        alert('Такий користувач вже інує');
      }else{
        this.block_btnsUser = false;
        const objUser = {
          id: Math.floor(Math.random() * 1000),
          userName: this.signIn_username,
          email: this.signIn_email,
          password: this.signIn_password,
        }
        this.saveName = this.signIn_username;
        this.SerService.addUser(objUser);
        this.menu2 = true;
        this.menu1 = false;
        this.signIn_email = '';
        this.signIn_username = '';
        this.signIn_password = '';
        this.sumUser = false;
        this.block_Add = false;
        this.block_back = false;
        this.block_signin = false;
        this.usName = false;
        this.siIn = false;
        this.siUp = false;
      }

    }else{
      this.disabledSubmit1 = true;
      
    }

  }

  editPost(index: number): void {
    this.block_Add = true;
    this.block_back = true;
    this.post = true;
    this.saveIndex = index;
    this.title = this.blog[index].topic;
    this.text = this.blog[index].message;
    this.post = false;
    this.edit_Post = true;
  }
  btnSavePost(): void {
    const obj = {
      id: Math.floor(Math.random() * 1000),
      postedBy: this.saveName,
      topic: this.title,
      data: '10:00',
      message: this.text
    }
    this.SerService.EditPost(obj, this.saveIndex);
    this.title = '';
    this.text = '';
    this.block_Add = false;
    this.block_back = false;
    this.edit_Post = false
  }
  btnDelete(blog: number): void {
    this.SerService.deletePost(blog);
  }
}
