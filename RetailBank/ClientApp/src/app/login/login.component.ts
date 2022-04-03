import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../interface/Client';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/clientservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  client: Client;
  createForm;

  constructor(public clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.createForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {

  }


  save() {

    const clientObject: Client = {
      clientName: this.createForm.value.name,
      clientBalance: 0,
      clientOwes: 0,
      clientOwesFromAmount: 0,
      clientOwesFrom: "",
      clientOwesTo: "",
      id: 0
     
    }

    console.log(this.createForm.value);


    this.clientService.login(clientObject).subscribe(res => {
      console.log(res);

      this.router.navigate(['home'], { state: { clientObj: res } });
    })
  }

}
