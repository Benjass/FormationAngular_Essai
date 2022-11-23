import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SeriesState, SeriesStore } from './series.store';

@Injectable({ providedIn: 'root' })
export class SeriesQuery extends QueryEntity<SeriesState> {
  constructor(protected myStore: SeriesStore) {
    super(myStore);
  }
}
