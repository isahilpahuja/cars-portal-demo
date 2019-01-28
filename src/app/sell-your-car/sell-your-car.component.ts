import { Component, OnInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell-your-car',
  templateUrl: './sell-your-car.component.html',
  styleUrls: ['./sell-your-car.component.scss']
})
export class SellYourCarComponent implements OnInit {

  model: any;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.reset();
  }

  submit(carForm) {

    if (!carForm.form.valid) {
      alert('All Fields Are Mandatory');
    } else {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      this.http.post('http://localhost:8080/car/add', this.model)
        .pipe(map((response: any) => response)).subscribe(
          (data: any) => {
            this.reset();
            alert('Submitted!!');
          },
          err => {
            alert('Oops!! Something Went Wrong!!');
          }
        );
    }
  }
  reset() {
    this.model = {
      firstName: '',
      lastName: '',
      email: '',
      year: '',
      model: '',
      make: '',
      trim: '',
      color: '',
      transmission: '',
      drivetrain: '',
      price: '',
      type: '',
      body: '',
      picture: 'ferrari-488-gtb.jpg',
      phone: ''
    };
  }
}