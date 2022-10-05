interface INavData {
  id: string;
  title: string;
  type: string;
}
export let navData: INavData[] = [];
export const navDataClear = () => (navData = []);
