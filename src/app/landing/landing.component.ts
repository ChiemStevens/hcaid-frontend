import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.http.get<any>('https://hcaid-backend.herokuapp.com/');
  }

  ngOnInit(): void {
    
  }

}
