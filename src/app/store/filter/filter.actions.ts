import { createAction, props } from '@ngrx/store';

export const setFilter = createAction(
  '[Filter] Set Filter',
  props<{ search: string }>()
);

export const setOrder = createAction(
  '[Filter] Set Order',
  props<{ orderBy: orderBy; direction:direction }>()
);

export const setType = createAction(
  '[Filter] Set Type',
  props<{ productType: productType }>()
);


export enum orderBy{
'name'= 'name',
'price' = 'price' 
} 

export enum direction{
  'asc'= 'asc',
  'desc' = 'desc' 
  } 

  export enum productType{
'supplements' = 'supplements' ,
'products' = 'products' ,
'all' = 'all'
} 