import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { SharedModule } from '../../shared.module';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    // Configuración de columnas que puede venir en el input
    component.columns = [
      { key: 'name', title: 'Name', type: 'text' },
      { key: 'logo', title: 'Logo', type: 'img' },
    ];

    // Listado que podría venir en el input
    component.list = [
      { id: 1, name: 'Product A', logo: 'logo-a.png' },
      { id: 2, name: 'Product B', logo: 'logo-b.png' },
    ];

    component.paginatorSizeOptions = [5, 10, 20];
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Renderización de columnas', () => {
    test('Debería mostrar el numero de columnas correctas', () => {
      const thElements = fixture.nativeElement.querySelectorAll('thead th');
      //Se le agrega +1 por el th que contiene las acciones
      expect(thElements.length).toBe(component.columns.length + 1);
    });

    test('Debería mostrar los titulos de las columnas correctamente', () => {
      const thElements = fixture.nativeElement.querySelectorAll('thead th');
      expect(thElements[0].textContent.trim()).toBe('Name');
      expect(thElements[1].textContent.trim()).toBe('Logo');
    });
  });

  describe('Renderización de filas', () => {
    test('Debería mostrar el número de filas correctas', () => {
      const rows = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rows.length).toBe(component.displayedList.length);
    });

    test('Debería mostrar las columnas de tipo texto correctamente', () => {
      const firstRowFirstCell = fixture.nativeElement.querySelector(
        'tbody tr:first-child td:first-child'
      );
      expect(firstRowFirstCell.textContent.trim()).toBe('Product A');
    });

    test('Debería mostrar las columnas de tipo imagen correctamente', () => {
      const firstRowSecondCell = fixture.nativeElement.querySelector(
        'tbody tr:first-child td:nth-child(2) img'
      );
      expect(firstRowSecondCell.src).toContain('logo-a.png');
    });
  });

  describe('Paginación', () => {
    test('Debería mostrar el número correcto de resultados en la información del paginador.', () => {
      const paginatorInfo = fixture.nativeElement.querySelector('.info-page');
      expect(paginatorInfo.textContent.trim()).toBe('2 Resultados');
    });

    test('Debe actualizar la lista mostrada cuando cambia el tamaño del paginador (1)', () => {
      component.sizeOptionControl.setValue(1);
      fixture.detectChanges();

      expect(component.displayedList.length).toBe(1);
      const rows = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rows.length).toBe(1);
    });
  });

  describe('Dropdown menu', () => {
    test('Debería abrir el menú cuando se hace clic en el botón de acción.', () => {
      const actionButton = fixture.nativeElement.querySelector(
        'tbody tr:first-child .icon-button'
      );
      actionButton.click();
      fixture.detectChanges();

      const menu = fixture.nativeElement.querySelector('.menu');
      expect(menu).toBeTruthy();
    });

    test('Debería cerrar el menu cuando toca en cualquier parte de la pantalla', () => {
      component.toggleMenu(component.displayedList[0]);
      fixture.detectChanges();

      document.body.click();
      fixture.detectChanges();

      const menu = fixture.nativeElement.querySelector('.menu');
      expect(menu).toBeFalsy();
    });

    test('Debería emitir el evento delete cuando se clickea el boton eliminar', () => {
      jest.spyOn(component.emitDeleteBtn, 'emit');

      // Nos aseguramos que el elemento de la columna es valido
      const itemToTest = component.displayedList[0];
      expect(itemToTest).toBeTruthy();

      component.toggleMenu(itemToTest);
      fixture.detectChanges();

      expect(component.isMenuOpenFor(itemToTest)).toBe(true);

      const deleteButton = fixture.nativeElement.querySelector(
        '.menu-item:nth-child(2)'
      );

      expect(deleteButton).toBeTruthy();

      deleteButton.click();

      expect(component.emitDeleteBtn.emit).toHaveBeenCalledWith(itemToTest);
    });

    test('Debería emitir el evento update cuando se clickea el boton "Editar"', () => {
      jest.spyOn(component.emitUpdateBtn, 'emit');

      // Nos aseguramos que el elemento de la columna es valido
      const itemToTest = component.displayedList[0];
      expect(itemToTest).toBeTruthy();

      component.toggleMenu(itemToTest);
      fixture.detectChanges();

      expect(component.isMenuOpenFor(itemToTest)).toBe(true);

      const updateButton = fixture.nativeElement.querySelector(
        '.menu-item:nth-child(1)'
      );

      expect(updateButton).toBeTruthy();

      updateButton.click();

      expect(component.emitUpdateBtn.emit).toHaveBeenCalledWith(itemToTest);
    });
  });

  describe('Mensaje "Sin Registros"', () => {
    test('Debería mostrar "No existen registros" cuando la lista venga vacía', () => {
      component.displayedList = [];
      fixture.detectChanges();

      const noRecordsMessage =
        fixture.nativeElement.querySelector('.no-records span');
      expect(noRecordsMessage.textContent.trim()).toBe('No existen registros');
    });

    test('Debería ocultar "No existen registros" cuando la lista no esté vacía', () => {
      const noRecordsMessage =
        fixture.nativeElement.querySelector('.no-records');
      expect(noRecordsMessage).toBeFalsy();
    });
  });
});
