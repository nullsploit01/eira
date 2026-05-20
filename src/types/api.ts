export type AdviceSlipResponse = {
  slip: {
    id: number;
    advice: string;
  };
};

export type ActivityResponse = {
  activity: string;
  availability: number;
  type: string;
  participants: number;
  price: number;
  accessibility: string;
  duration: string;
  kidFriendly: boolean;
  link: string;
  key: string;
};
