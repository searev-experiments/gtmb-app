import { Component, OnInit, OnDestroy } from '@angular/core';
import { GtmbService } from '../../core/gtmb.service';
import { ActivatedRoute } from '@angular/router';
import { Request } from '../request';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  public request = new Request();
  public loaded = false;
  private alive = true;

  constructor(private route: ActivatedRoute,
              private gtmbService: GtmbService) { }

  ngOnInit() {

    this.route.params.subscribe(
      params => {
        this.gtmbService.getContract(params['address'])
        .then(
          data => {
            this.request = data;
            this.request.address = params['address'];

            this.gtmbService.getRequestBackers(params['address'])
            .then(
              backers => {
                this.loaded = true;
                this.request.backers = backers;
              },
              err => console.log(err)
            );
          },
          err => console.log(err),
        );


      }
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  canBackUp(): boolean {
    return this.request.receiver !== this.gtmbService.getAccount()
        && !this.request.backers.some(backer => backer === this.gtmbService.getAccount());
  }

  canPayDebt(): boolean {
    return this.request.receiver === this.gtmbService.getAccount();
  }

  backUp() {
    this.gtmbService.backUp(this.request.address)
    .then(
      data => this.request.backers.push(data),
      err => console.log(err)
    );
  }

  pay() {
    this.gtmbService.payDebt(this.request.address)
    .then(
      data => console.log(data),
      err => console.log(err)
    );
  }

}
