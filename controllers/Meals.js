import Meals from '../models/MealsModel.js';
import Nutritions from '../models/NutrisionsModel.js';
import Sequelize from 'sequelize';

export const getMealsById = async (req, res) => {
    const { id: userId } = req.params;
    try {
        // Check if userId is undefined or null
        if (!userId) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'userId parameter is missing in the request.',
            });
        }

        const userMeals = await Meals.findAll({
            where: {
                userId: userId,
            },
            attributes: ['mealId', 'meals_name'],
        });

        return res.json({
            error: false,
            message: `Meals for userId ${userId}`,
            data: userMeals,
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        });
    }
};



export const addMeal = async (req, res) => {
    const { id: userId } = req.params;
    const { meals_name } = req.body;

    try {
        // Ensure meals_name is an array
        if (!Array.isArray(meals_name)) {
            return res.status(400).json({
                error: true,
                message: 'meals_name should be an array of strings.',
            });
        }

        // Join the names to create the meals_name
        const joinedMealNames = meals_name.join(', ');

        // Fetch nutrition data based on meal names using a loop
        const nutritionData = {
            total_calories: 0,
            total_carbs: 0,
            total_proteins: 0,
            total_fats: 0,
            total_minerals: 0,
        };

        // Fetch nutrition data based on meal names using a loop
        for (const mealName of meals_name) {
            const mealNutrition = await Nutritions.findOne({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('calories')), 'total_calories'],
                    [Sequelize.fn('SUM', Sequelize.col('carbs')), 'total_carbs'],
                    [Sequelize.fn('SUM', Sequelize.col('proteins')), 'total_proteins'],
                    [Sequelize.fn('SUM', Sequelize.col('fats')), 'total_fats'],
                    [Sequelize.fn('SUM', Sequelize.col('minerals')), 'total_minerals'],
                ],
                where: {
                    nutrisionId: mealName,
                },
                raw: true, // Retrieve raw data without unnecessary metadata
            });

            // Add the nutrition for the current meal to the totals
            nutritionData.total_calories += parseInt(mealNutrition.total_calories, 10) || 0;
            nutritionData.total_carbs += parseInt(mealNutrition.total_carbs, 10) || 0;
            nutritionData.total_proteins += parseInt(mealNutrition.total_proteins, 10) || 0;
            nutritionData.total_fats += parseInt(mealNutrition.total_fats, 10) || 0;
            nutritionData.total_minerals += parseInt(mealNutrition.total_minerals, 10) || 0;
        }

        // Create a new meal with the total nutrition values
        const dataMealsCreate = await Meals.create({
            userId: userId,
            meals_name: joinedMealNames,
            calories: nutritionData.total_calories,
            carbs: nutritionData.total_carbs,
            proteins: nutritionData.total_proteins,
            fats: nutritionData.total_fats,
            minerals: nutritionData.total_minerals,
        });

        const { userId: excludedUserId, ...mealsData } = dataMealsCreate.dataValues;

        res.json({
            error: false,
            message: 'Meal added successfully by ' + userId,
            data: {
                userId: userId,
                meals: {
                    mealId: mealsData.mealId,
                    meals_name: mealsData.meals_name,
                    calories: mealsData.calories,
                    carbs: mealsData.carbs,
                    proteins: mealsData.proteins,
                    fats: mealsData.fats,
                    minerals: mealsData.minerals,
                    updatedAt: mealsData.updatedAt,
                    createdAt: mealsData.createdAt,
                },
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: 'Error adding meal',
        });
    }
};








export const deleteMealsById = async (req, res) => {
    const { id: userId } = req.params;
    const { mealId } = req.body;

    try {
        const mealToDelete = await Meals.findOne({
            where: {
                userId: userId,
                mealId: mealId,
            },
        });

        if (!mealToDelete) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Meal not found',
            });
        }

        const dataMealsDelete = await Meals.destroy({
            where: {
                userId: userId,
                mealId: mealId,
            },
        });

        res.json({
            message: 'Meal deleted successfully',
            data: {
                meal: mealToDelete,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: 'Internal Server Error',
        });
    }
};

export const dashboardAPi = async (req, res) => {
    const { id: userId } = req.params;

    const date = new Date();
    const today = date.getDate();

    try {
        const getMealsDay = await Meals.findAll({
            where: {
                userId: userId,
            },
        });

        const getMealsThisDay = getMealsDay.filter((meal) => {
            const mealDate = new Date(meal.createdAt).getDate();
            return mealDate === today;
        });

        const calculate = getMealsThisDay.reduce((acc, curr) => {
            return {
                calories: acc.calories + curr.calories,
                carbs: acc.carbs + curr.carbs,
                proteins: acc.proteins + curr.proteins,
                fats: acc.fats + curr.fats,
                minerals: acc.minerals + curr.minerals,
            };
        }, {
            calories: 0,
            carbs: 0,
            proteins: 0,
            fats: 0,
            minerals: 0,
        });

        res.json({
            error: false,
            message: 'Meals for userId ' + userId,
            data: {
                NutrisionForToday: calculate,
            }
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Internal Server Error',
        });
    }
};
