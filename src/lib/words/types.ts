export interface ILuluWord {
  id: string;
  uuid: string;
  word: string;
  exp: string;
  addtime: string;
  context: { line: string };
  html?: string;
  phon: string;
}

export interface IResponse {
  data: ILuluWord[];
}
