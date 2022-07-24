import { atom } from 'recoil';

export const atomActiveNav = atom({
  default: false,
  key: `atomActiveMenu${Math.random().toString(36)}`,
});
