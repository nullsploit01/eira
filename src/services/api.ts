import type { ActivityResponse, AdviceSlipResponse } from '../types/api';
import axios from 'axios';

export const getAdvice = async () => {
  await axios.get<AdviceSlipResponse>('https://api.adviceslip.com/advice');
};

export const getTodaysQuest = async () => {
  await axios.get<ActivityResponse>('https://bored-api.appbrewery.com/random');
};
