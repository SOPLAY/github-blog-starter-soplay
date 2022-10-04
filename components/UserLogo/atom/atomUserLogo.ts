import { atom } from 'recoil';

export const atomUserLogo = atom({
  default: '',
  key: `atomUserLogo${Math.random().toString(36)}`,
});
