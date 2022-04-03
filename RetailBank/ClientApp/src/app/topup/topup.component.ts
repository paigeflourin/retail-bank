import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../interface/Client';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/clientservices.service';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.css']
})

export class TopupComponent implements OnInit {
  client: Client;
  topupForm;
  existingBalance: string;

  constructor(public clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.client = this.router.getCurrentNavigation().extras.state.clientObj;

    this.topupForm = this.formBuilder.group({
      amount: ['', Validators.required]
    });
  }

  topup() {

    let newBalance = this.client.clientBalance + parseInt(this.topupForm.value.amount);

    const clientObjectUpd: Client = {
      id: this.client.id,
      clientName: this.client.clientName,
      clientBalance: newBalance,
      clientOwes: this.client.clientOwes,
      clientOwesFrom: this.client.clientOwesFrom,
      clientOwesTo: this.client.clientOwesTo,
      clientOwesFromAmount: this.client.clientOwesFromAmount

    }

    console.log(clientObjectUpd);


    this.clientService.topup(clientObjectUpd).subscribe(res => {
      console.log(res);


      if (res === 1) {
        this.client = clientObjectUpd;
        this.router.navigate(['home'], { state: { clientObj: this.client } });
      }
      
    })

  }

  ngOnInit() {
    this.existingBalance = this.client.clientBalance.toString();
  }

}



