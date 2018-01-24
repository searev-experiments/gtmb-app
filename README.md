# Give The Money Back ! - Smart Contract

## Description

This repository contains the code of the smart contract used for the *Give the Money Back !* experiment, and is used in the article [Building a DApp with the Ethereum blockchain and Angular 5 - part 2:
the service](http://huberisation.eu/2018/01/24/building-app-angular-ethereum-part-2/).

It allows to:
* Publish an instance of the [GiveTheMoneyBack](https://github.com/searev-experiments/gtmb-smart-contract) smart contract on an Ethereum network
* Fetch an existing instance of the contract
* Back up the request and pay the debt

## Requirements
* NodeJS > 6.9
* Truffle v4.0.5

You can install Truffle using npm:

```
$ npm install -g truffle
```

## Build and test the smart contract

Once you have clone the repository, launch the *Truffle development* environment using

```
$ truffle develop
```

There, you can run the test using

```
$ truffle(develop)> test
```

It should automatically run the migrations and test the contracts, so you have the latest version of the artifacts in the `build/` folder.

## Run the app locally

Once the truffle development blockchain is running, you can test you app locally using

```
$ ng serve
```

Simply browse at `127.0.0.1:4200`.

## To Do:
* Use Metamask instead of relying on a local http provider