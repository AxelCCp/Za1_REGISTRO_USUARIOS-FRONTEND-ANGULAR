import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  lenguajes1 : string[] = ["Java","Python","C","C++","C#","Kotlin","Swift","PHP","Javascript","Visual Basic","Ruby","SQL"];

  lenguajes2 : string[] = ["Perl","Rust","Typescript","R","Scheme","Pascal","Elixir","Postcript","Scala","Lava","Haskell"];

}
