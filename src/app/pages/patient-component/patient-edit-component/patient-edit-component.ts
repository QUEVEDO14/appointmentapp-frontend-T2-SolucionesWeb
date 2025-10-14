import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Patient } from '../../../model/patient';
import { PatientService } from '../../../services/patient-service';

@Component({
  selector: 'app-patient-edit-component',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
],
  templateUrl: './patient-edit-component.html',
  styleUrl: './patient-edit-component.css'
})

export class PatientEditComponent {
  form: FormGroup;

  constructor(private patientService: PatientService){}

  ngOnInit(): void{
    this.form = new FormGroup({
      idPatient: new FormControl(),
      dni: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl('')
    });
  }

  persist(){
    const patient: Patient = new Patient();
    patient.idPatient = this.form.value['idPatient'];
    patient.dni = this.form.value['dni'];
    patient.firstName = this.form.value['firstName'];
    patient.lastName = this.form.value['lastName'];
    patient.phone = this.form.value['phone'];
    patient.email = this.form.value['email'];
    patient.address = this.form.value['address'];

    this.patientService.save(patient).subscribe();
  }
}
