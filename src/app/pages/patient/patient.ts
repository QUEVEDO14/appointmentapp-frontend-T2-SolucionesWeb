import { Component } from '@angular/core';
import { PatientService } from '../../services/patient-service';
import { Patient } from '../../model/patient';

@Component({
  selector: 'app-patient',
  imports: [],
  templateUrl: './patient.html',
  styleUrl: './patient.css'
})
export class PatientComponent {
  patients: Patient[];

  constructor(private patientService: PatientService){}

  ngOnInit():void{
    // this.patientService.findAll().subscribe(data => console.log(data));
    this.patientService.findAll().subscribe(data => this.patients = data);
  }
}
