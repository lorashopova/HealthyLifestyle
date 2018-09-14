import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
  @Input() items;
  @Output() onOrderByDateAsc = new EventEmitter();
  @Output() onOrderByDateDesc = new EventEmitter();
  @Output() onOrderByTitleAsc = new EventEmitter();
  @Output() onOrderByTitleDesc = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  orderByDateAsc() {
    this.items.sort((a, b) => +a.createdOn - +b.createdOn);
    this.onOrderByDateAsc.emit(this.items);
  }

  orderByDateDesc() {
    this.items.sort((a, b) => +b.createdOn - +a.createdOn);
    this.onOrderByDateDesc.emit(this.items);
  }

  orderByTitleAsc() {
    this.items.sort((a, b) => a.title.localeCompare(b.title));
    this.onOrderByTitleAsc.emit(this.items);
  }

  orderByTitleDesc() {
    this.items.sort((a, b) => b.title.localeCompare(a.title));
    this.onOrderByTitleDesc.emit(this.items);
  }

}
