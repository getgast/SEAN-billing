import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WebServiceService } from 'src/app/service/web-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.scss']
})
export class AddClientsComponent implements OnInit {
  public addClientForm: FormGroup;
  constructor(private http: WebServiceService, private router: Router) { }

  ngOnInit(): void {
    this.addClientForm = this.initClientsAddForm();
  }


  initClientsAddForm(){
    return new FormGroup({
      clientName: new FormControl(),
      clientAddress: new FormControl(),
      clientPhone: new FormControl()
    })
  }

  onSubmit() {
    console.log('add')
    this.http.post('api/v1/add-client', this.addClientForm.value).subscribe(data=>{
      console.log(data)
      this.router.navigate(['/client-list']);
    })
  }
}
