import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import * as Web3 from 'web3';
import * as contract from 'truffle-contract';
import * as GiveTheMoneyBack from '../../../build/contracts/GiveTheMoneyBack.json';

import { Request } from '../give-the-money-back/request';


@Injectable()
export class GtmbService {

  // Creates an abstraction of our contract thanks to truffle-contract
  private contract;
  private account;

  constructor() {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
    this.account = web3.eth.accounts[0];
    this.contract = contract(GiveTheMoneyBack);
    this.contract.setProvider(web3.currentProvider);
  }

  /**
   * Fetches the current account used to interact with the blockchain.
   */
  public getAccount(): string {
    return this.account;
  }

  /**
   * Fetches a contract from an address.
   * @param address Hex. address of the contract to fetch.
   */
  public getContract(address: string): Promise<Request> {

    // Creates the request we will send in the Observable.
    const request = new Request();

    // Allow us to store the instance of the contract and use it the various callbacks.
    let meta;

    return this.contract.at(address)
    .then ( instance    => { meta = instance; return meta.owner.call(); })
    .then ( owner       => { request.owner = owner; return meta.receiver.call(); })
    .then ( receiver    => { request.receiver = receiver; return meta.amount.call(); })
    .then ( amount      => { request.amount = amount.toNumber(); return meta.description.call(); })
    .then ( description => { request.description = description; return meta.nbBackers.call(); })
    .then ( nbBackers   => { request.nbBackers = nbBackers.toNumber(); return request; });

  }

  /**
   * Fetches an array containing the addresses of those who support the request.
   * @param address Hex. address of the contract to fetch backers from
   */
  public getRequestBackers(address: string): Promise<string[]> {

    let meta;

    return this.contract.at(address)
    .then (instance => { meta = instance; return meta.nbBackers.call()})
    .then (nbBackers => {
      const promises = [];
      for (let i = 0; i < nbBackers; i++) {
        promises.push(meta.backers.call(i).then( backer =>  backer ));
      }

      return Promise.all(promises).then(values => values);
    });

  }

  /**
   * Creates a new request for money.
   * @param request Request containing the parameters required to create the contract
   */
  public createContract(request: Request): Promise<Request> {

    return this.contract.new(request.receiver, request.amount, request.description,
      { from: this.account, gas: 4712388 })
      .then (
        instance => { request.address = instance.address; return request; }
      );

  }

  /**
   * Backs up the request for money.
   * @param address Hex. address of the contract to interact with
   */
  public backUp(address: string): Promise<string> {
    let meta;

    return this.contract.at(address)
    .then(instance => { meta = instance; return instance.backUp.call({from: this.account}); })
    .then(result => {
      if (result) {
        return meta.backUp({from: this.account});
      } else {
        throw 'Cannot back up the request';
      }
    }).then(result => {
      if (result.logs[0].event === 'Backed') {
        return this.account;
      } else {
        throw 'Could not back up the request';
      }
    });
  }

  /**
   * Pays a contract.
   * @param address Hex. address of the contract to interact with
   */
  public payDebt(address: string): Promise<boolean> {
    let meta;
    let amountToPay;

    return this.contract.at(address).then(function(instance) {
      meta = instance;
      // First, fetch the amount of wei to send
      return instance.amount.call();
    }).then(amount => {
      amountToPay = amount;
      return meta.payDebt({from: this.account, value: amountToPay});
    }).then(result => {
      if (result.logs[0].event === 'MoneyGivenBack') {
        return true;
      } else {
        throw 'Could not back up the request';
      }
    });
  }

}
