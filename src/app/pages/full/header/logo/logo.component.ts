import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit() {
  }

  get isComcast() {
    return this.userService.isComcast;
  }

}
