import { Component, OnInit } from '@angular/core';
import { UserService, User } from './user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  $users: Observable<User[]>;
  title = 'frontend';

  ngOnInit(): void {
    this.$users = this.userService.list();
  }

  constructor(private readonly userService: UserService) { }


  submit(user: User): void {
    this.userService.put(user._id, user).subscribe();
  }
}
