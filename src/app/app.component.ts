import { Component } from '@angular/core';
import { GtmbService } from './core/gtmb.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Request } from './give-the-money-back/request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private gtmbService: GtmbService,
              public router: Router) {}

  ngOnInit() {
  }
}
