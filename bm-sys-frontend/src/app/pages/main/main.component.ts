import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  shoot(){
    this.httpClient.get('http://localhost:3000/test-root').subscribe(data=>{
      console.log(data)
    })
  }

  shootDb(){
    this.httpClient.get('http://localhost:3000/test-db').subscribe(data=>{
      console.log(data)
    })
  }

  shootDbElem() {
    this.httpClient.get('http://localhost:3000/test-db-elem').subscribe(data=>{
      console.log(data)
    })
  }

}
