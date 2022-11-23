import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-serie-form',
  templateUrl: './serie-form.component.html',
  styleUrls: ['./serie-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SerieFormComponent {
  @Input()
  serie: ISerie = { title: '' } as ISerie;

  @Output()
  created = new EventEmitter<ISerie>();

  @Output()
  updated = new EventEmitter<ISerie>();

  get pageTitle() {
    return this.serie.id ? 'Update serie' : 'Create serie';
  }

  get pageButton() {
    return this.serie.id ? 'Update' : 'Create';
  }

  constructor() {}

  create(form: NgForm) {
    if (!form.valid) return;
    const payload: ISerie = {
      ...this.serie,
      ...form.value
    };
    // ! Since parents listen to either, but not both events
    this.created.emit(payload);
    this.updated.emit(payload);
    form.reset();
  }
}
