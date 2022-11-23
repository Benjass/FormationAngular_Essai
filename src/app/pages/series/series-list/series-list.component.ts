import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesListComponent implements OnInit {

  series$ = this.service.series$;

  constructor(private service: SeriesService) {}

  ngOnInit(): void {}
}
