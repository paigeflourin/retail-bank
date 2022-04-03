
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../interface/Client';
import { ClientService } from '../services/clientservices.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})


export class HomeComponent {
  client: Client;

  owesTo = false;
  owesFrom = false;
  payAmount: number;

  constructor(private clientService: ClientService, private router: Router) {
    this.client = this.router.getCurrentNavigation().extras.state.clientObj;
    this.payAmount = this.router.getCurrentNavigation().extras.state.payAmount;
  }
  state: any;

  ngOnInit() {
    console.log(this.client, this.payAmount);

  }


  onTopup() {
    this.router.navigate(['topup'], { state: { clientObj: this.client } });
  }

  onPay() {
    this.router.navigate(['pay'], { state: { clientObj: this.client } });
  }


}
