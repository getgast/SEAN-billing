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
    {text: 'Historia Zamówień', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/order-history'},
    {text: 'Dodaj Produkt (A)', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/add-product'},
    {text: 'Lista Produktów', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/product-list'},
    {text: 'Lista Zamówień (A)', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/ordered-items'},
    {text: 'Dodaj klienta (A)', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/add-client'},
    {text: 'Lista Klientów', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/client-list'},
    {text: 'Indywidualne Ceny Klientów (A)', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/client-special-offers'}, // to do
    {text: 'Uprawnienia Użytkowników (A)', cols: 1, rows: 1, color: '#D9EDD9' , lingTo: '/user-panel'} // to do
  ];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
}
