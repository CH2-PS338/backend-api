import Users from '../models/UserModels.js';
import Nutrisions from '../models/NutrisionsModel.js';
import Meals from '../models/MealsModel.js';
import FactHealths from '../models/FactHealthsModel.js';


const Migrate = async () => {
    await Users.sync();
    await Nutrisions.sync();
    await Meals.sync();
    await FactHealths.sync();

    console.log('Tables created');
}

export default Migrate;

