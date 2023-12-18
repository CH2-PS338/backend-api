import Nutrisions from '../models/NutrisionsModel.js';

export const getNutrisions = async (req, res) => {
    try {
        const nutrisions = await Nutrisions.findAll();
        res.json({
            error: false,
            message: 'Nutrisions fetched successfully',
            data: nutrisions
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: true,
            message: 'Something went wrong'
        });
    }
}


export const addNutrisions = async (req, res) => {
    const { nutrisionId, name, calories, carbs, proteins, fats, minerals } = req.body;
    try {
        const createdNutrisions = await Nutrisions.create({
            nutrisionId: nutrisionId,
            name: name,
            calories: calories,
            carbs: carbs,
            proteins: proteins,
            fats: fats,
            minerals: minerals
        })
        res.json({
            error: false,
            message: 'Nutrisions created successfully',
            data: createdNutrisions
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: true,
            message: 'Something went wrong'
        });
    }
}

export const deleteNutrisions = async (req, res) => {
    const { id: nutrisionId } = req.params;
    try {
        const deletedNutrisions = await Nutrisions.destroy({
            where: {
                nutrisionId: nutrisionId
            }
        })
        res.json({
            error: false,
            message: 'Nutrisions deleted successfully',
            data: deletedNutrisions
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: true,
            message: 'Something went wrong'
        });
    }
}