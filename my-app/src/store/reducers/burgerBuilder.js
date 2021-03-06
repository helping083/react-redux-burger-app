import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/burger-utils';


const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 2,
    cheese: 1,
    meat: 2
};

const initialState =  {
    ingredients: null,
    totalPrice: 6,
    error: false,
    building: false,
    id_to_redirect: undefined,
    todos: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 6,
                building: false
            })
        case actionTypes.CALC_PRICE:
            const newPrice = action.ingredients;
            let price = initialState.totalPrice;
            if(newPrice) {
                for (let key in newPrice) {
                    price+=newPrice[key]*INGREDIENTS_PRICES[key];
                }
            }
           return updateObject(state, {totalPrice: price});
        case actionTypes.FETCH_INGREDIENTS_FAILED:
           return updateObject(state, {error: true});
        default:
            return state;
    }
}
export default reducer;