import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { SeriesQuery } from '../../providers/states/series.query';
import { SeriesStore } from '../../providers/states/series.store';

@Injectable()
export class SeriesService {
  private _url = 'http://localhost:3000/series';

  public series$ = this.query.selectAll();

  public get series() {
    return this.query.getAll();
  }

  constructor(
    private http: HttpClient,
    private store: SeriesStore,
    private query: SeriesQuery
  ) {
    this.getSeries().subscribe();
  }

  getSeries() {
    return this.http
      .get<ISeries>(this._url)
      .pipe(tap((series) => this.setState(series)));
  }

  getSerie(id: string) {
    return this.http.get<ISerie>(`${this._url}/${id}`);
  }

  updateSerie(serie: ISerie) {
    const { id, ...payload } = serie;

    return this.http.put<ISerie>(`${this._url}/${id}`, payload).pipe(
      tap((serie) => {
        this.updateState(serie);
      })
    );
  }

  addSerie(serie: Omit<ISerie, 'id' | 'watched'>) {
    const payload: Omit<ISerie, 'id'> = { ...serie, watched: false };

    return this.http.post<ISerie>(this._url, payload).pipe(
      tap((serie) => {
        this.extendState(serie);
      })
    );
  }

  private extendState(serie: ISerie) {
    this.store.add(serie);
  }

  private setState(state: ISeries) {
    this.store.set(state);
  }

  private updateState(serie: ISerie) {
    this.store.update(serie.id, serie);
  }
}
