import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface SeriesState
 extends EntityState<ISerie, number> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'series', idKey: 'id' })
export class SeriesStore 
  extends EntityStore<SeriesState> {

  constructor() {
    super();
  }

}
