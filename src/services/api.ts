import type { ActivityResponse, AdviceSlipResponse } from '../types/api';
import axios from 'axios';

export const getAdvice = async () => {
  return await axios.get<AdviceSlipResponse>('https://api.adviceslip.com/advice');
};

export const getTodaysQuest = async () => {
  return await axios.get<ActivityResponse>(
    'https://corsproxy.io/?https://bored-api.appbrewery.com/random',
  );
};
