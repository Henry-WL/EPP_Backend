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
  tagsArr: string[]
//   tags: [{ type: String }],
//   date: string;
}

export interface JoinEvent {
    // const { userId, username } = req.body;
    userId: string;
    username: string
}

export interface LeaveEvent {
    userId: string;
}

export interface UserParams {
    userId: string;
}

// export interface UpdateEventBody {
//   name?: string; // Optional fields, since in update requests, all fields might not be provided
//   location?: string;
//   date?: string;
// }

