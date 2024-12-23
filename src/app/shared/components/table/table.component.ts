import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

export interface ColumnTableI {
  key: string;
  title: string;
  type: 'text' | 'img' | 'date';
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() columns!: ColumnTableI[];
  @Input() set list(value: any[]) {
    this._list = value || [];
    this.updateDisplayedList();
  }
  @Input() showPaginator: boolean = true;
  @Input() paginatorSizeOptions: number[] = [5, 10, 20];
  @Input() showActions: boolean = true;

  @Output() emitDeleteBtn: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitUpdateBtn: EventEmitter<any> = new EventEmitter<any>();

  displayedList: any[] = [];

  private _list: any[] = [];
  private menuState: Map<any, boolean> = new Map();

  sizeOptionControl: FormControl = new FormControl({
    disabled: false,
    value: this.paginatorSizeOptions[0],
  });

  ngOnInit(): void {
    this.sizeOptionControl.valueChanges.subscribe({
      next: (value) => {
        this.updateDisplayedList();
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['list']) {
      this.updateDisplayedList();
    }
  }

  toggleMenu(item: any): void {
    const isOpen = this.menuState.get(item) || false;
    this.menuState.clear();
    this.menuState.set(item, !isOpen);
  }

  onClickActions(type: 'delete' | 'update', item: any) {
    if (type === 'delete') this.emitDeleteBtn.emit(item);

    if (type === 'update') this.emitUpdateBtn.emit(item);
  }

  isMenuOpenFor(item: any): boolean {
    return this.menuState.get(item) || false;
  }

  closeMenus(): void {
    this.menuState.clear();
  }

  trackByFn(index: number, item: any): any {
    return item['id'] || index;
  }

  private updateDisplayedList(): void {
    const size = this.sizeOptionControl.value || 5;
    this.displayedList = this._list.slice(0, size);
  }

  /**
   * Este HostListener, servirá para ocultar el menú de opciones
   * cuando el usuario de clic en cualquier lugar de la pantalla
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    const clickedInsideMenu =
      target.closest('.menu') || target.closest('.icon-button');
    if (!clickedInsideMenu) {
      this.closeMenus();
    }
  }
}
