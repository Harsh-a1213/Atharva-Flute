
export interface InstrumentClass {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

export interface Instructor {
  id: number;
  name: string;
  instrument: string;
  imageUrl: string;
  bio: string;
}
