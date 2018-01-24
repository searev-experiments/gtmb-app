import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { GtmbService } from '../../core/gtmb.service';
import { Request } from '../request';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy {

  public requests: Request[] = [];
  public filteredRequest: Request;

  private searchCtrl = new FormControl();
  private alive = true;

  constructor(private gtmbService: GtmbService,
              private router: Router) {
    this.searchCtrl
      .valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .takeWhile(() => this.alive)
      .subscribe(
        term => {
          console.log(term);
          this.gtmbService.getContract(term)
          .then(
            data => this.filteredRequest = data,
            err => console.log(err)
          );
        }
      );
    }

    ngOnDestroy() {
    this.alive = false;
  }

  goToDetail() {
    this.router.navigate(['/requests', this.filteredRequest.address]);
  }

}
