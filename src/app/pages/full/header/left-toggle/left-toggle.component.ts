import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-left-toggle',
  templateUrl: './left-toggle.component.html',
  styleUrls: ['./left-toggle.component.scss']
})
export class LeftToggleComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
