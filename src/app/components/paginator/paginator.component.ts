import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnInit, OnChanges {
  /** The total number of records */
  @Input() collectionSize = 0;

  /** The number of records to display */
  @Input() pageSize = 5;

  /** Current page */
  @Input() currentPage = 1;

  /** The number of buttons to show either side of the current page */
  @Input() maxSize = 2;

  /** Display the Next/Previous buttons */
  @Input() nextPreviousButtons = true;

  @Output() pageChange = new EventEmitter<number>();

  totalPages: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.totalPages = new Array(Math.ceil(this.collectionSize / this.pageSize));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.totalPages = new Array(Math.ceil(this.collectionSize / this.pageSize));
  }

  /** Set page number */
  selectPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    this.pageChange.emit(this.currentPage);
  }

  /** Set next page number */
  next() {
    const nextPage = this.currentPage + 1;
    nextPage <= this.totalPages.length && this.selectPageNumber(nextPage);
  }

  /** Set previous page number */
  previous() {
    const previousPage = this.currentPage - 1;
    previousPage >= 1 && this.selectPageNumber(previousPage);
  }

}
