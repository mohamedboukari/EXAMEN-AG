import { Injectable } from '@angular/core';
import { Event } from 'src/models/Event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  api = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  createEvent(Event: Event): Observable<Event> {
    return this.http.post<Event>(this.api, Event);
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.api);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.api}/${id}`);
  }

  updateEvent(id: string, Event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.api}/${id}`, Event);
  }

  deleteEvent(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
