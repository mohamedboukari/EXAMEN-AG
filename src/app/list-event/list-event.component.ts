import { Component } from '@angular/core';
import { MyEvent } from 'src/models/Event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
})
export class ListEventComponent {
  allEvents: MyEvent[] = [];
  events: MyEvent[] = [];
  search = '';
  nbrdis = -1;
  constructor(private es: EventService) {}
  ngOnInit(): void {
    this.es.getAllEvents().subscribe((data: MyEvent[]) => {
      this.allEvents = data;
      this.updateItems();
    });
  }
  updateItems(): void {
    if (!this.search) {
      this.events = this.allEvents;
    } else {
      this.events = this.allEvents.filter(
        (st) => st.date.includes(this.search) || st.lieu.includes(this.search)
      );
    }
  }
  handleDelete = (id: number) => {
    this.es.deleteEvent(id.toString()).subscribe(() => this.ngOnInit());
  };
  handleCal = () => {
    this.nbrdis = this.allEvents.filter((st) => st.disponible).length;
  };
}
