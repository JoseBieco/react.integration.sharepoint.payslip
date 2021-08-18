interface Version {
  name: string;
  url: string;
}

export interface Game {
  game_index: number;
  version: Version;
}

export interface HoleriteProps {
  name: string;
  order: number;
  weight: number;
  img: string;
  games_in: Game[];
}

export const HoleriteInitialProps:HoleriteProps = {
  name: '',
  order: 0,
  weight: 0,
  img: '',
  games_in: [],
}


export interface HoleriteState {
  name: string;
  order: number;
  weight: number;
  img: string;
  games_in: Game[];
  isOpen: boolean;
}

export const HOLERITE_INITIAL_STATE: HoleriteState = {
  name: '',
  order: 0,
  weight: 0,
  img: '',
  games_in: [],
  isOpen: false,
}