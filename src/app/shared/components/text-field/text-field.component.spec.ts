import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldComponent } from './text-field.component';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { SharedModule } from '../../shared.module';

describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<TextFieldComponent>;
  let mockControlContainer: Partial<ControlContainer>;

  beforeEach(async () => {
    const formGroup = new FormGroup({
      testControl: new FormControl(''),
    });

    mockControlContainer = {
      control: formGroup,
    };

    await TestBed.configureTestingModule({
      declarations: [TextFieldComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ControlContainer,
          useValue: mockControlContainer,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;

    component.nameControl = 'testControl';
    component.labelText = 'Nombre Producto';
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Debería inicializar correctamente el control', () => {
    expect(component.control).toBeTruthy();
    expect(component.control instanceof FormControl).toBe(true);
  });

  test('Debería mostrar un mensaje de error cuando el control es requerido', () => {
    component.control.setErrors({ required: true });

    component.control.markAsTouched(); // Marcar el control como tocado

    fixture.detectChanges();

    // Simular el evento de pérdida de foco (blur)
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    expect(component.errorMessage).toBe('El campo es requerido');
  });

  test('Debería manejar el input cuando cambia su valor', () => {
    const onChangeMock = jest.fn();
    component.registerOnChange(onChangeMock);

    const inputElement = document.createElement('input');
    inputElement.value = 'New Value'; //Simulamos el cambio de valor

    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: inputElement });

    // Llamar al método de manejo de cambio del componente
    component.handleInputChange(event);

    // Verificamos que el cambio coincida con el llamado
    expect(onChangeMock).toHaveBeenCalledWith('New Value');
    expect(component.value).toBe('New Value');
  });

  test('Debería llamar a onTouched cuando el campo fue tocado', () => {
    const onTouchedSpy = jest.fn();
    component.registerOnTouched(onTouchedSpy);
    component.onTouched();
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
