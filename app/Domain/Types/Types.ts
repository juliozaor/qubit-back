import { Pager } from "../Pager";

export type Paginable<T> = { pagination: Pager, datos: T[]; }
export type TipoOrdenamiento = 'asc' | 'desc'
export interface Diccionario {
    [key: string]: string;
  }