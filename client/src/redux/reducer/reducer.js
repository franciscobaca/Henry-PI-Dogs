import { FILTER_BY_MIN_WEIGHT,  GET_DOGS, DELETE_DOG, GET_DETAIL, GET_TEMPERAMENTS, FILTER_BY_TEMPERAMENT, FILTER_CREATED, FILTER_NAME, FILTER_BY_WEIGHT, SEARCH_DOG, POST_DOG, CLEAR_DETAIL, SET_CURRENT_PAGE } from '../actions/types'

const initialState = {
    dogs: [],
    allDogs: [],
    dogDetail: {},
    temperaments: [],
    currentPage: 1,
}

function reducer(state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }

        case GET_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            }

        case SEARCH_DOG:
            return {
                ...state,
                dogs: action.payload
            }

        case POST_DOG:
            return {
                ...state
            }
        
        case CLEAR_DETAIL:
            return {
                ...state,
                dogDetail: []
            }    
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
            
        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.allDogs;
            const temperamentFilter = action.payload === 'All' ? allDogs : allDogs.filter(dog => dog.temperament?.includes(action.payload)) 
            return {
                ...state,
                dogs: temperamentFilter
            }

        case FILTER_CREATED:
            const dogs = state.allDogs;
            const createdOrApi = action.payload === 'created' ? dogs.filter(d => d.createdInDb) : dogs.filter(d => !d.createdInDb);
            return {
                ...state,
                dogs: action.payload === "all" ? dogs : createdOrApi
            }

        case FILTER_BY_WEIGHT:
            const allDogsWeights = state.allDogs.filter(dog => dog.weight_prom)
            const filterWeights = action.payload === "minWeight" ? allDogsWeights.sort((a,b) => {
                if(a.weight_prom > b.weight_prom){
                    return 1;
                }
                if(a.weight_prom < b.weight_prom){
                    return -1;
                }
                return 0
            })
            : allDogsWeights.sort((a,b) => {
                if(a.weight_prom > b.weight_prom){
                    return 1;
                }
                if(a.weight_prom < b.weight_prom){
                    return -1;
                }
                return 0
            }).reverse()

            return {
                ...state,
                dogs: filterWeights
            }
            
        case FILTER_NAME:
            const filteredDogs = action.payload === 'desc' ? state.dogs.sort((a,b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1;   
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()){
                    return 1;
                }
                return 0;
            })
            : state.dogs.sort((a,b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;   
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()){
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                dogs: filteredDogs
            }
            
        case DELETE_DOG:
            return {
                ...state,
                dogs: state.dogs.filter(dog => dog.id !== action.payload)
            }
                    
        default:
            return { ...state }
    }
};

export default reducer;