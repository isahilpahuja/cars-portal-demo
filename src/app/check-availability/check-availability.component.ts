import { Component, OnInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-availability',
  templateUrl: './check-availability.component.html',
  styleUrls: ['./check-availability.component.scss']
})
export class CheckAvailabilityComponent implements OnInit {

  model: any;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.reset();
  }


  send(checkForm) {
    if (!checkForm.form.valid) {
      alert('All Fields Are Mandatory');
    }
    alert('Message Sent!');
    this.router.navigate(['./used-car-portal']);
  }

  reset() {
    this.model = {
      firstname: '',
      lastname: '',
      email: '',
      query: '',
      agree: ''
    };
  }
}
