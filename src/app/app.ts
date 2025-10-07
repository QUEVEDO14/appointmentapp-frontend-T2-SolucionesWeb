import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientComponent } from './pages/patient/patient';
import { MedicComponent } from './pages/medic/medic';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PatientComponent, MedicComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('appointmentapp-frontend');
}
