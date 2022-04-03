import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../interface/Client';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../services/clientservices.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  client: Client;
  payForm;
  existingBalance: string;
  clientOwesTo: string;


  constructor(public clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.client = this.router.getCurrentNavigation().extras.state.clientObj;

    this.payForm = this.formBuilder.group({
      amount: ['', Validators.required],
      recipient: ''
    });
  }

  ngOnInit() {
    this.existingBalance = this.client.clientBalance.toString();
    this.clientOwesTo = this.client.clientOwesTo;
  }


  pay() {
    let payAmount = parseInt(this.payForm.value.amount);
    let newBalance = this.client.clientBalance - payAmount;
    let newOweAmt = Math.max(0, this.client.clientOwes - payAmount);


    const clientObjectUpd: Client = {
      id: this.client.id,
      clientName: this.client.clientName,
      clientBalance: newBalance,
      clientOwes: newOweAmt,
      clientOwesFrom: this.client.clientOwesFrom,
      clientOwesTo: (newOweAmt === 0) ? null : this.client.clientOwesTo,
      clientOwesFromAmount: this.client.clientOwesFromAmount
    }

    console.log(clientObjectUpd);


    this.clientService.topup(clientObjectUpd).subscribe(res => {
      console.log(res);


      if (res === 1) {
        this.client = clientObjectUpd;

        this.router.navigate(['home'], { state: { clientObj: this.client, recipient: this.clientOwesTo, payAmount: payAmount } });


        //const owedClient: Client = {
        //  id: 0,
        //  clientName: this.clientOwesTo,
        //  clientBalance: 0,
        //  clientOwes: 0,
        //  clientOwesFrom: "",
        //  clientOwesTo: "",
        //  clientOwesFromAmount: 0
        //}

        //this.clientService.getClientDataByName(owedClient).subscribe(recipientRes => {
        //  let recNewBalance = recipientRes.clientBalance + payAmount;

        //  recipientRes.clientBalance = recNewBalance;


        //  this.clientService.topup(recipientRes).subscribe(res => {
        //    console.log(res);


        //    if (res === 1) {
        //      this.client = clientObjectUpd;
        //      this.router.navigate(['home'], { state: { clientObj: this.client, recipient: this.clientOwesTo, payAmount: payAmount } });
        //    }

        //  })

        //})
      }

    })
  }

}



