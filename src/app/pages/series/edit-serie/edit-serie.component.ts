import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-edit-serie',
  templateUrl: './edit-serie.component.html',
  styleUrls: ['./edit-serie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSerieComponent implements OnInit {
  serie$ = this.route.params.pipe(
    map(({ id }) => id),
    switchMap((id) => this.service.getSerie(id))
  );

  constructor(private service: SeriesService, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  updateSerie(serie: ISerie) {
    this.service.updateSerie(serie).subscribe(({ id }) => {
      console.log(`Serie #${id} updated`);
    });
  }
}
