export interface EventParams {
  eventId: string;
}

export interface CreateEventBody {
  name: string;
  location: string;
//   date: string;
}

export interface JoinLeaveEvent {
    // const { userId, username } = req.body;
    userId: string;
    username: string
}

// export interface UpdateEventBody {
//   name?: string; // Optional fields, since in update requests, all fields might not be provided
//   location?: string;
//   date?: string;
// }

