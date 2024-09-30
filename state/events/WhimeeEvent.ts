export enum WhimeeEventType {
  Sport = "Sport",
  Culture = "Culture",
  Party = "Party",
  Foods = "Foods",
  Games = "Games",
  Meetings = "Meetings",
}

export enum WhimeeEventTypeIcon {
  Sport = "sports-basketball",
  Culture = "theater-comedy",
  Party = "party-popper",
  Foods = "fast-food",
  Games = "game-controller",
  Meetings = "people",
}

export enum WhimeeEventTypeColor {
  Sport = "#658147",
  Culture = "#8EACCD",
  Party = "#F0EAAC",
  Foods = "#FF8A8A",
  Games = "#CB80AB",
  Meetings = "#EF9C66",
}

export class WhimeeEvent {
  id: number = 0;
  name: string = "";
  description: string = "";
  startDate: number = 0;
  endDate: number = 0;
  locationLat: number = 0;
  locationLong: number = 0;
  type: string = "";
}

export function getEventIcon(event: WhimeeEvent): string {
  return WhimeeEventTypeIcon[event.type as keyof typeof WhimeeEventTypeIcon];
}

export function getEventColor(event: WhimeeEvent): string {
  return WhimeeEventTypeColor[event.type as keyof typeof WhimeeEventTypeColor];
}
