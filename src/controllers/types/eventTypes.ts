export interface EventParams {
  eventId: string;
}

export interface CreateEventBody {
  name: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  ticketPrice: number,
  payWant: boolean,
  tagsArr: string[],
  filmData: object
}

export interface JoinEvent {
    userId: string;
    username: string
}

export interface LeaveEvent {
    userId: string;
}

export interface UserParams {
    userId: string;
}