export interface HoleriteState {
  user_id: string;
  month_code: string;
  holerites: Array<Holerite>;
  isLoading: boolean;
  error: Array<Error>;
}

export const HOLERITE_INITIAL_STATE: HoleriteState = {
  user_id: '',
  month_code: '',
  holerites: [],
  isLoading: false,
  error: []
};

/**
 * Interface that represents the response single data
 */
export interface Holerite {
  CODIGO: string;
  DESCRICAO: string;
  IPERI: string;
}

export interface Error {
  message: string;
}
