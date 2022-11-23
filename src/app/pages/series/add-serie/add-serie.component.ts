import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-add-serie',
  templateUrl: './add-serie.component.html',
  styleUrls: ['./add-serie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSerieComponent implements OnInit {
  constructor(private service: SeriesService) {}

  ngOnInit(): void {}

  createSerie(serie: ISerie) {
    this.service.addSerie(serie).subscribe(({ id }) => {
      console.log(`Serie #${id} created`);
    });
  }
}
