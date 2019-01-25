import { Component, OnInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit {

  carsList: any;
  yearList = [{ value: 0, desc: '--select--' }];
  makeList: any;
  modelList: any;
  selectedMakeList = [];
  selectedModelList = [];
  isShowSpinner: boolean;
  isShowModel: boolean;
  year: Number = 0;
  make: any;
  makeCheckBox: any;
  sortCriteria: any;
  sortData: any;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.sortData = [
      { column: '--select-', order: '', orderDesc: '' },
      { column: 'Price', order: 'desc', orderDesc: 'Higest' },
      { column: 'Price', order: 'asc', orderDesc: 'Lowest' },
      { column: 'Year', order: 'desc', orderDesc: 'Newest' },
      { column: 'Year', order: 'asc', orderDesc: 'Oldest' }
    ];
    this.sortCriteria = this.sortData[0];
    this.getcarsList();
    this.getYearList();
    this.getMakeList();
  }

  getcarsList() {
    this.http.get('http://localhost:8080/car/carList', { responseType: 'json' })
      .pipe(map((response: any) => response)).subscribe(
        (data: any) => {
          this.carsList = data;
        },
        err => {
          alert('Oops!! Something Went Wrong!!');
        }
      );
  }

  getYearList() {
    this.isShowSpinner = true;
    this.http.get('http://localhost:8080/car/years', { responseType: 'json' })
      .pipe(map((response: any) => response)).subscribe(
        (data: any) => {
          let years = [];
          for (let val of data) {
            years.push({ value: val, desc: val });
          }
          this.yearList = [...this.yearList, ...years];
          this.isShowSpinner = false;
        },
        err => {
          this.isShowSpinner = false;
          alert('Oops!! Something Went Wrong!!');
        }
      );
  }

  getMakeList() {
    this.isShowSpinner = true;
    this.http.get('http://localhost:8080/car/makes', { responseType: 'json' })
      .pipe(map((response: any) => response)).subscribe(
        (data: any) => {
          this.makeList = data;
          this.isShowSpinner = false;
        },
        err => {
          this.isShowSpinner = false;
          alert('Oops!! Something Went Wrong!!');
        }
      );
  }

  getModelList() {
    this.isShowSpinner = true;
    const request = {
      makes: this.selectedMakeList
    };
    this.http.post('http://localhost:8080/car/modelList', request)
      .pipe(map((response: any) => response)).subscribe(
        (data: any) => {
          this.modelList = data;
          this.isShowSpinner = false;
          this.isShowModel=true;
        },
        err => {
          this.isShowSpinner = false;
          alert('Oops!! Something Went Wrong!!');
        }
      );
  }

  checkAvailability(car) {
    this.router.navigate(['./check-availability']);
  }

  search() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const request = {
      year: this.year ? this.year : '',
      makes: this.selectedMakeList,
      models: this.selectedModelList
    };
    this.http.post('http://localhost:8080/car/search', request)
      .pipe(map((response: any) => response)).subscribe(
        (data: any) => {
          this.carsList = data;
        },
        err => {
          alert('Oops!! Something Went Wrong!!');
        }
      );
  }

  onYearChange(event) {
    this.search();
  }
  onMakeSelect(event, make) {
    if (event.target.checked) {
      this.selectedMakeList.push(make);
    } else {
      const index = this.selectedMakeList.indexOf(make);
      if (index > -1) {
        this.selectedMakeList.splice(index, 1);
      }
    }
    if(this.selectedMakeList.length>0){
      this.getModelList();
    } else {
      this.modelList=[];
      this.selectedModelList=[];
      this.isShowModel=false;
    }
    this.search();
  }

  onModelSelect(event, model) {
    if (event.target.checked) {
      this.selectedModelList.push(model);
    } else {
      const index = this.selectedModelList.indexOf(model);
      if (index > -1) {
        this.selectedModelList.splice(index, 1);
      }
    }
    this.search();
  }

  onSortChange(event) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const request = {
      column: this.sortCriteria.column,
      order: this.sortCriteria.order
    };
    let sortUrl = '';
    if (this.sortCriteria.column === 'Price' && this.sortCriteria.order === 'desc') {
      sortUrl = 'http://localhost:8080/car/sortByPriceDesc';
    } else if (this.sortCriteria.column === 'Price' && this.sortCriteria.order === 'asc') {
      sortUrl = 'http://localhost:8080/car/sortByPriceAsc';
    } else if (this.sortCriteria.column === 'Year' && this.sortCriteria.order === 'desc') {
      sortUrl = 'http://localhost:8080/car/sortByYearDesc';
    } else if (this.sortCriteria.column === 'Year' && this.sortCriteria.order === 'asc') {
      sortUrl = 'http://localhost:8080/car/sortByYearAsc';
    } else {
      this.getcarsList();
    }
    this.http.get(sortUrl, { responseType: 'json' })
      .pipe(map((response: any) => response)).subscribe(
        (data: any) => {
          this.carsList = data;
        },
        err => {
          alert('Oops!! Something Went Wrong!!');
        }
      );
    // alert(`${this.sortCriteria.column} ${this.sortCriteria.order}`);
  }

  reset(){
    this.modelList=[];
    this.year=0;
    this.isShowModel=false;
    this.selectedMakeList = [];
    this.selectedModelList = [];
    this.makeList=[];
    this.getcarsList();
    this.getMakeList();
  }
}
