import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

  questionsForm!: FormGroup;
  isLoading = false;

  constructor(private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
    this.questionsForm = new FormGroup({
      question1Form: new FormGroup({
        answer: new FormControl('', [Validators.required])
      }),
      question2Form: new FormGroup({
        answer: new FormControl('', [Validators.required])
      }),
      question3Form: new FormGroup({
        answer: new FormControl('', [Validators.required])
      }),
      question4Form: new FormGroup({
        answer: new FormControl('', [Validators.required])
      }),
      question5Form: new FormGroup({
        answer: new FormControl('', [Validators.required])
      }),
      question6Form: new FormGroup({
        answer: new FormControl('', [Validators.required])
      }),
      question7Form: new FormGroup({
        answer: new FormControl('', [Validators.required])
      })
    })

  }


  async onClick(): Promise<void> {
    if(this.questionsForm.valid) {
      let answers = []
      for (let i = 1; i < 8; i++) {
        answers.push(this.questionsForm.get('question' + i + 'Form')?.get('answer')?.value)
      }

      const json = "{\"key\": [" + answers.toString() + "]}"
      var answersBase64 = btoa(json);
      this.isLoading = true;
      this.http.get<any>('https://hcaid-backend.herokuapp.com/?key=' + answersBase64).subscribe(value => {

        const json = "{\"key\": [" + value[0].toString() + "," + value[1].toString() + "]}"
        var resultsBase64 = btoa(json);

        this.router.navigate(['/result'], { queryParams: { result: resultsBase64, answers: answersBase64 } });
      });
    }
  }
}
