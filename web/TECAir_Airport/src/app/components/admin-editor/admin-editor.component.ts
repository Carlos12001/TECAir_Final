import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../../services/admin-editor.service';
import { Promo } from '../../models/promo.model';
import { Flight } from '../../models/flight.model';
import { UserLogged } from 'src/app/models/user-logged.model';

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.css'],
})
export class AdminEditorComponent implements OnInit {
  selectedEntity: string = '';
  dataAdmin: Admin | undefined;
  entities = [
    { label: 'vuelos', value: 'flights' },
    { label: 'promociones', value: 'promos' },
    { label: 'Usuarios', value: 'user-logged' },
  ];

  flights: Flight[] = [];
  promos: Promo[] = [];

  selectedFlight: Flight | null = null;
  selectedPromo: Promo | null = null;

  originalFlight: Flight | null = null;
  originalPromo: Promo | null = null;

  /**
   * The constructor function initializes private properties for the router and adminEditorService.
   * @param {Router} router - The `router` parameter is an instance of the `Router` class, which is used for navigating between different routes in an Angular application. It allows you to programmatically navigate to different views or components.
   * @param {AdminEditorService} adminEditorService - The `adminEditorService` parameter is an instance of the `AdminEditorService` class. It is used to interact with the backend and perform administrative tasks related to editing content.
   */
  constructor(
    private router: Router,
    private adminEditorService: AdminEditorService
  ) {}

  ngOnInit(): void {
    this.dataAdmin = Admin; // Assuming 'Admin' is what you meant to use here.
    if (this.dataAdmin.name === undefined) {
      this.router.navigate(['admin/login']);
    }
  }

  deepCopy(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    // Especifica el tipo aquí
    const copy: Record<string, any> = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = this.deepCopy(obj[key]);
      }
    }
    return copy;
  }

  /**
   * Clear all data in the class variables.
   */
  clearData() {
    this.Flight = [];
    this.selectedFlight = null;
    this.originalFlight = null;
    this.Promo = [];
    this.selectedPromo = null;
    this.originalPromo = null;
  }

  trackByFunction(index: number, item: any): number {
    return index;
  }

  /**
   * Sets the selected entity.
   *
   * @param {string} entity - The entity to set as selected.
   */
  setSelectedEntity(entity: string) {
    this.clearData();
    this.selectedEntity = entity;
    if (entity === 'flights') {
      this.loadFlights();
    }
    if (entity === 'promos') {
      this.loadPromos();
    }
  }

  //
  //
  // promos
  //
  //

  /**
   * Loads the promos by making a request to the server and updating the `promos` class variable with the received data.
   *
   * @return {void}
   */
  loadPromos() {
    this.adminEditorService.getPromos().subscribe({
      next: (data: Promo[]) => {
        this.promos = data;
        console.log('Promociones cargadas exitosamente.');
      },
      error: (err: any) => {
        console.error('Error al cargar las promociones:', err);
        if (err.status === 404) {
          console.log('No se encontraron promociones.');
        } else {
          console.log('Ocurrió un error desconocido.', err);
        }
      },
      complete: () => {
        console.log('La carga de promociones se ha completado.');
      },
    });
  }

  selectPromo(promo: Promo) {
    this.selectedPromo = this.deepCopy(promo);
    this.originalPromo = promo;
  }

  submitPromo() {
    if (this.selectedPromo) {
      if (this.selectedPromo.fno === '--New Promo--') {
        const newId = window.prompt('Introduce el nuevo ID de la promoción');

        if (
          newId === null ||
          isNaN(Number(newId)) ||
          Number(newId) < 0 ||
          !Number.isInteger(Number(newId))
        ) {
          console.log('Envío cancelado o número inválido');
          return;
        }

        const doesExist = this.promos.some(
          (promo) => promo.fno === Number(newId)
        );

        if (doesExist) {
          window.alert(
            'Ya existe una promoción con el mismo id. Por favor, elige otro ID.'
          );
          return;
        } else {
          this.selectedPromo.fno = Number(newId);
        }
      }

      if (
        JSON.stringify(this.originalPromo) ===
        JSON.stringify(this.selectedPromo)
      ) {
        console.log('Ningún cambio detectado, envío cancelado.');
        return;
      }

      // I've commented this out since it seemed out of place. You might want to check.
      // if (this.selectedPromo != null) {
      //   this.deletePromo();
      // }

      this.adminEditorService.addPromo(this.selectedPromo).subscribe({
        next: (data: Promo[]) => {
          console.log('Película agregada o actualizada exitosamente.');
          this.promos = data;
        },
        error: (err: any) => {
          console.error('Error al agregar o actualizar la promoción:', err);
        },
        complete: () => {
          console.log('La operación de agregar o actualizar se ha completado.');
        },
      });
    }
  }

  deletePromo() {
    if (this.selectedPromo) {
      this.adminEditorService.deletePromo(this.selectedPromo).subscribe({
        next: (data: Promo[]) => {
          console.log('Promo borrada exitosamente:', this.selectedPromo);
          this.clearData();
          this.promos = data;
        },
        error: (err: any) => {
          console.error('Error al borrar la promoción:', err);
          if (err.status === 404) {
            console.log('La promoción no se encontró.');
          } else {
            console.log('Ocurrió un error desconocido.', err);
          }
        },
        complete: () => {
          console.log('La operación de borrado se ha completado.');
        },
      });
    }
  }

  addNewPromo() {
    this.originalPromo = null;
    this.loadPromos();
    this.selectedPromo = {
      fno: 0,
      image: '',
      dpercent: 0,
      finaldate: '',
    };
  }

  //
  // userLoggeds
  //
  //

  /**
   * Loads the userLoggeds by making a request to the server and updating the `userLoggeds` class variable with the received data.
   *
   * @return {void}
   */
  loadUserLoggeds() {
    this.adminEditorService.getUserLoggeds().subscribe({
      next: (data: UserLogged[]) => {
        this.userLoggeds = data;
        console.log('Usuarios logueados cargados exitosamente.');
      },
      error: (err: any) => {
        console.error('Error al cargar los usuarios logueados:', err);
        if (err.status === 404) {
          console.log('No se encontraron usuarios logueados.');
        } else {
          console.log('Ocurrió un error desconocido.', err);
        }
      },
      complete: () => {
        console.log('La carga de usuarios logueados se ha completado.');
      },
    });
  }

  selectUserLogged(userLogged: UserLogged) {
    this.selectedUserLogged = this.deepCopy(userLogged);
    this.originalUserLogged = userLogged;
  }

  submitUserLogged() {
    if (this.selectedUserLogged) {
      if (this.selectedUserLogged.email === '--New UserLogged--') {
        const newEmail = window.prompt(
          'Introduce el nuevo correo del usuario logueado'
        );

        // Validación simple para el correo electrónico. Puede agregar una validación más estricta si lo desea.
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!newEmail || !emailPattern.test(newEmail)) {
          console.log('Envío cancelado o correo inválido');
          return;
        }

        const doesExist = this.userLoggeds.some(
          (userLogged) => userLogged.email === newEmail
        );

        if (doesExist) {
          window.alert(
            'Ya existe un usuario logueado con el mismo correo. Por favor, elige otro correo.'
          );
          return;
        } else {
          this.selectedUserLogged.email = newEmail;
        }
      }

      if (
        JSON.stringify(this.originalUserLogged) ===
        JSON.stringify(this.selectedUserLogged)
      ) {
        console.log('Ningún cambio detectado, envío cancelado.');
        return;
      }

      this.adminEditorService.addUserLogged(this.selectedUserLogged).subscribe({
        next: (data: UserLogged[]) => {
          console.log('Usuario logueado agregado o actualizado exitosamente.');
          this.userLoggeds = data;
        },
        error: (err: any) => {
          console.error(
            'Error al agregar o actualizar el usuario logueado:',
            err
          );
        },
        complete: () => {
          console.log('La operación de agregar o actualizar se ha completado.');
        },
      });
    }
  }

  deleteUserLogged() {
    if (this.selectedUserLogged) {
      this.adminEditorService
        .deleteUserLogged(this.selectedUserLogged)
        .subscribe({
          next: (data: UserLogged[]) => {
            console.log(
              'Usuario logueado borrado exitosamente:',
              this.selectedUserLogged
            );
            this.clearData();
            this.userLoggeds = data;
          },
          error: (err: any) => {
            console.error('Error al borrar el usuario logueado:', err);
            if (err.status === 404) {
              console.log('El usuario logueado no se encontró.');
            } else {
              console.log('Ocurrió un error desconocido.', err);
            }
          },
          complete: () => {
            console.log('La operación de borrado se ha completado.');
          },
        });
    }
  }
}
