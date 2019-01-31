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
    } else {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      const request = {
        user: this.model
      };
      this.http.post('http://localhost:8080/user/add', this.model)
        .pipe(map((response: any) => response)).subscribe(
          (data: any) => {
            alert('Message Sent!');
          },
          err => {
            alert('Oops!! Something Went Wrong!!');
          }
        );
      this.router.navigate(['./used-car-portal']);
    }
  }

  reset() {
    this.model = {
      firstName: '',
      lastName: '',
      email: '',
      notes: '',
      agree: ''
    };
  }
}
