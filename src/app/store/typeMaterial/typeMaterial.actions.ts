import { createAction, props } from "@ngrx/store";
import { TypeMaterial } from "../../services/models/TypeMaterial.interface";


export const loadTypeMaterials = createAction('[Type Material] loadTypeMaterials');

export const loadTypeMaterialsSuccess = createAction('[Type Material] loadTypeMaterialsSuccess', props<{ typeMaterials:TypeMaterial[]}>());

export const loadTypeMaterialsFailure = createAction('[Type Material] loadTypeMaterialsFailure', props<{ error:string}>());

export const addTypeMaterial = createAction('[Type Material] addTypeMaterial', props<{ name:string }>());

export const addTypeMaterialSuccess = createAction('[Type Material] addTypeMaterialSuccess');

export const addTypeMaterialFailure = createAction('[Type Material] addTypeMaterialFailure', props<{ error:string }>());

export const updateTypeMaterial = createAction('[Type Material] updateTypeMaterial', props<{ id:string, name:string}>());

export const updateTypeMaterialSuccess = createAction('[Type Material] updateTypeMaterialSuccess');

export const updateTypeMaterialFailure = createAction('[Type Material] updateTypeMaterialFailure', props<{ error:string}>());

export const deleteTypeMaterial = createAction('[Type Material] deleteTypeMaterial', props<{ id:string}>());

export const deleteTypeMaterialSuccess = createAction('[Type Material] deleteTypeMaterialSuccess');

export const deleteTypeMaterialFailure = createAction('[Type Material] deleteTypeMaterialFailure', props<{ error:string}>());