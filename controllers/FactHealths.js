import FactHealths from "../models/FactHealthsModel.js";

export const addFactHealths = async (req, res) => {
    const { fact, source } = req.body;

    if (!fact || !source) {
        return res.status(400).json({
            error: true,
            message: "Please provide all the required details"
        });
    }

    try {
        const newFact = await FactHealths.create({
            fact,
            source,
        });
        return res.json({
            error: false,
            message: "Fact added successfully",
            data: newFact
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: "Something went wrong"
        });
    }
};

export const getRandomFact = async (req, res) => {

    const calculateFact = await FactHealths.count();

    const factId = Math.floor(Math.random() * calculateFact) + 1;

    try {
        const randomFact = await FactHealths.findAll({
            where: {
                factId: factId
            },
            attributes: ['factId', 'fact', 'source'],
        });
        return res.json({
            error: false,
            message: "Random fact fetched successfully",
            data: randomFact
        }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: "Something went wrong"
        });
    }
};