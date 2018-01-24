import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListComponent } from './list/list.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';

import { MatButtonModule, MatInputModule, MatIconModule, MatCardModule } from '@angular/material';
import { GiveTheMoneyBackRoutingModule } from './give-the-money-back-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    GiveTheMoneyBackRoutingModule,
  ],
  declarations: [
    ListComponent,
    ThumbnailComponent,
    DetailComponent,
    CreateComponent
  ]
})
export class GiveTheMoneyBackModule { }
