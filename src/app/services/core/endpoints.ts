export const endpoints = {
    products:{
        getProducts:'/products',
        getSupplement:'/products/supplements',
        createProduct:'/products',
    },
    config:{
        createConfig:'/config',
        getTypes:'/config'
    },
    filament:{
        createFilament:'/filament'
    },
    typeMaterial:{
        getTypeMaterials:'/type-material',
        getNamesTypeMaterials:'/type-material/names'
    },
    brand:{
        addBrand:'/brand-filament',
        getBrands:'/brand-filament'
    },
    color:{
        addColor:'/color',
        getColors:'/color'
    }


}