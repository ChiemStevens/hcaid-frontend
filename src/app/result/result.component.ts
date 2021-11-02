import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  result: any[] = [];
  accuracy : number = 0;
  type : string = "";

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      const base64 = params['result']
      const string = atob(base64)
      var json = JSON.parse(string);
      this.result = json['key']
      console.log(this.result)

      if(this.result[0] > this.result[1]) { //Introvert
        this.type = "Introvert"
        this.accuracy = this.result[0] * 100
      }
      else { //Extrovert
        this.type = "Extrovert"
        this.accuracy = this.result[1] * 100
      }
  });
  }

  ngOnInit(): void {
  }

}
