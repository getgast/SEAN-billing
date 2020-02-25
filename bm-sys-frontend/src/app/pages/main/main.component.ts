import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public tiles = [
    {text: 'Dodaj Zamówienie', cols: 2, rows: 1, color: '#D9EDD9', lingTo: '/add-order'},
    {text: 'Historia Zamówień', cols: 2, rows: 1, color: '#D9EDD9' , lingTo: '/order-history'},
    {text: 'Lista Produktów', cols: 2, rows: 1, color: '#D9EDD9' , lingTo: '/order-history'},
    {text: 'Lista klientów', cols: 2, rows: 1, color: '#D9EDD9' , lingTo: '/order-history'},
  ];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
}
