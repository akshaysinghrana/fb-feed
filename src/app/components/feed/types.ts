export interface IStory {
  id: number;
  price: number;
  title: string;
};

export interface IFeed {
  story: IStory
};