import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor } from '../../providers/http/auth.interceptor';
import { AddSerieComponent } from './add-serie/add-serie.component';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesService } from './series.service';
import { SerieFormComponent } from './serie-form/serie-form.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { EditSerieComponent } from './edit-serie/edit-serie.component';
import { IsWatchedDirective } from './is-watched/is-watched.directive';
import { SerieTitlePipe } from './serie-title/serie-title.pipe';

const routes: Routes = [
  { path: '', component: SeriesListComponent },
  { path: 'add', component: AddSerieComponent },
  { path: 'edit/:id', component: EditSerieComponent },
];

@NgModule({
  declarations: [
    SeriesListComponent, AddSerieComponent, SerieFormComponent, EditSerieComponent, IsWatchedDirective, SerieTitlePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [
    SeriesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class SeriesModule {}
