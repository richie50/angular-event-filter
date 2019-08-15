export type Filter = (event: Event) => boolean;
export type Filters = {[key: string]: Filter};