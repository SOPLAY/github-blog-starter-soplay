import { atom } from 'recoil';

export const atomActiveNav = atom({
  default: false,
  key: `atomActiveMenu${Math.random().toString(36)}`,
});

export const atomTaglist = atom({
  default: [''],
  key: `atomTagList${Math.random().toString(36)}`,
});
export const atomSeriseList = atom({
  default: [''],
  key: `atomSeriseList${Math.random().toString(36)}`,
});
