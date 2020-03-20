import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public tiles = [
    {text: 'Dodaj Zamówienie', cols: 1, rows: 1, color: '#D9EDD9', lingTo: '/add-order'},
    {text: 'Zamówienia', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/order-history'},
    {text: 'Lista Produktów', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/product-list'},
    {text: 'Zamówione Produkty (A)', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/ordered-items'},
    {text: 'Lista Klientów', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/client-list'},
    {text: 'Indywidualne Ceny Klientów (A)', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/client-special-offers'}, // to do
    {text: 'Uprawnienia Użytkowników (A)', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/user-panel'} // to do
  ];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
}
