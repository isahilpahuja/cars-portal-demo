import { Component, OnInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit {

  carsList: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getcarsList();
  }

  getcarsList() {
    this.http.get('http://localhost:8000/url', { responseType: 'json' })
      .pipe(map((response: any) => response)).subscribe(
        (data: any) => {
          this.carsList = data;
        },
        err => {
          alert('Oops!! Something Went Wrong!!');
        }
      );
  }
}
