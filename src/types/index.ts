export interface PlaceT {
  name: string;
  theme?: string;
  description?: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface RecommendOptionsT {
  schedule: string | null;
  region: string | null;
  theme: string | null;
}

export interface RecentSearchT {
  places: PlaceT[];
  options: RecommendOptionsT;
}
