import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyEvent } from 'src/models/Event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
})
export class AddEventComponent {
  event: MyEvent | undefined = undefined;
  formEvent: FormGroup = new FormGroup({});

  constructor(private eventService: EventService, private route: Router) {}

  ngOnInit(): void {
    this.formEvent = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.min(0)]),
      titre: new FormControl('', [Validators.required]),

      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      lieu: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      disponible: new FormControl(),

      nbrMax: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  isValidDate(): boolean {
    const date = new Date(this.formEvent.value.date);
    return new Date().getTime() <= date.getTime();
  }
  submit = (e: Event) => {
    e.preventDefault();

    const body: MyEvent = {
      id: this.formEvent.value.id.toString(),
      titre: this.formEvent.value.titre || '',
      description: this.formEvent.value.description || '',
      lieu: this.formEvent.value.lieu || '',
      date: this.formEvent.value.date,
      disponible: Boolean(this.formEvent.value.disponible),
      nbrMax: this.formEvent.value.nbrMax,
    };

    this.eventService.createEvent(body).subscribe(() => {
      this.route.navigateByUrl('/event');
      this.formEvent.reset();
    });
  };
}
