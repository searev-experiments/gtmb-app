import { Component, OnInit } from '@angular/core';
import { Request } from '../request';
import { GtmbService } from '../../core/gtmb.service';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  request: Request = new Request();

  constructor(private gtmbService: GtmbService,
              private router: Router) { }

  onSubmit() {
    this.gtmbService.createContract(this.request)
    .then(
      data => this.router.navigate(['/requests', data.address]),
      err => console.log(err)
    );
  }

}
