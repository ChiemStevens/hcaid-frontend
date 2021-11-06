import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  answers : any[] = [];
  result: any[] = [];
  accuracy : number = 0;
  type : string = "";
  reason : string = "<SOON>";
  isIntro : boolean = false;
  notSure : boolean = false;
  types : string[] = [];
  tips : string[] = [];

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      const resultsbase64 = params['result']
      const resultsstring = atob(resultsbase64)
      const resultsjson = JSON.parse(resultsstring);
      this.result = resultsjson['key']

      const answersBase64 = params['answers']
      const answersstring = atob(answersBase64)
      const answersjson = JSON.parse(answersstring);
      this.answers = answersjson['key']

      if(this.result[0] > this.result[1]) { //Introvert
        this.type = "Introvert"
        this.accuracy = this.result[0] * 100
        this.reason = "you like to be alone or not talk as much in a large group of people"
        this.isIntro = true;

        if(this.answers[5] < 3 || this.answers[6] < 3) { //likes small groups
          this.types.push("Social introverts. This is the \"classic\" type of introvert. Social introverts like small groups and quiet settings over crowds.");
          this.tips.push("You excell in talking to a small group of people and are a little bit more shy in a larger group of people. Do not worry and just be you! While at a party, find some people you would like to talk to and just imagine yourself with just this small group of people. This will help you to be more calm.");
        }

        if(this.answers[3] > 3) { //don't talk a lot
          this.types.push("Thinking introverts. People in this group are daydreamers. They spend a lot of time in their thoughts and tend to have creative imaginations.");
          this.tips.push("You are a big thinker and like to be by yourself from time to time. Social contact with other people can be though but we still encourage you to meet new people! Play a converstation in your head before a job interview to ease your mind. You will find it helpfull that you thought about the questions when they do come up!");
        }

        if(this.answers[4] > 3) { //i keep in the background.
          this.types.push("Anxious introverts. They seek out alone time not just because they like it, but also because they often feel awkward or shy around people.");
          this.tips.push("You might feel akward or shy around people, this is something you cannot do much about. We do want to say that you do not have to worry about how other people see you. If you take your time to express yourself and talk to people, they will eventually see what an amazing person you are.");
        }

        if(this.types.length == 0) {
          this.types.push("Social introverts. This is the \"classic\" type of introvert. Social introverts like small groups and quiet settings over crowds.");
          this.tips.push("You excell in talking to a small group of people and are a little bit more shy in a larger group of people. Do not worry and just be you! While at a party, find some people you would like to talk to and just imagine yourself with just this small group of people. This will help you to be more calm.");
        }
        
      }
      else { //Extrovert
        this.type = "Extrovert"
        this.accuracy = this.result[1] * 100
        this.reason = "you like to talk alot or be in a large group of people."
        this.isIntro = false;

        this.types.push("Extrovert. An extrovert type of person has less trouble talking to other people. They are usually focussed on other people and are always there to help others when they are needed.");
        this.tips.push("As an extrovert, try not to push an introvert person to do something they are not comfortable with. For them you will look like a bully. Instead encourage them to step out of their comfortzone from time to time.");
        this.tips.push("Carry the converstation. If you feel like the converstation is gonna go silent, bring up another topic to keep the converstation going. For you it will most likely feel the other person does not wanna talk to you. But in reality introverts have a harder time to lead a converstation, so do not be afraid to talk alot!");
        this.tips.push("Be you! If you do not have trouble talking to strangers then you will also find it easier to talk to a job interviewer. For your next interview, make sure to be yourself and not be afraid to show who you really are.")
      }

      if(this.accuracy < 75) {
        this.type = "introvert or extrovert (unknown)"
        this.accuracy = 100
        this.reason = "your answers are related to introverts and extroverts."
        this.notSure = true;
      }
  });
  }

  ngOnInit(): void {
  }

}
