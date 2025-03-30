import { EffectsBrand } from "./brand/brand.effects";
import { brandReducer } from "./brand/brand.reducer";
import { EffectColor } from "./colors/colors.effects";
import { colorsReducer } from "./colors/colors.reducer";
import { EffectFilament } from "./filaments/filaments.affects";
import { filamentReducer } from "./filaments/filaments.reducer";
import { EffectInitalApp } from "./initial.effects";
import { EffectsConfigMachine } from "./machine/machine.effects";
import { configMachineReducer } from "./machine/machine.reducer";
import { notificationReducer } from "./notifications/notification.reducer";
import { EffectsProducts } from "./products/products.effects";
import { productsReducer } from "./products/products.reducer";
import { EffectsTypeMaterial } from "./typeMaterial/typeMaterial.effects";
import { typeMaterialReducer } from "./typeMaterial/typeMaterial.reducer";


export const appReducers ={
    filaments:filamentReducer,
    brands:brandReducer,
    typeMaterials:typeMaterialReducer,
    color:colorsReducer,
    config_machine:configMachineReducer,
    notification:notificationReducer,
    products:productsReducer
}

export const appEffects = [
    EffectFilament,
    EffectsBrand,
    EffectsTypeMaterial,
    EffectColor,
    EffectInitalApp,
    EffectsConfigMachine,
    EffectsProducts
]