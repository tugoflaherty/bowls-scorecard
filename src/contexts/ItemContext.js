import React from 'react';
import { useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actionTypes } from '../helpers/actionTypes';

const ItemContext = React.createContext();
const STORAGE_KEY = 'bowls_scorecard_storage_key';

let initialScorecardState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.create:
            return [
                ...state,
                {
                    id: action.payload.id,
                    match: {
                        dateTime: action.payload.match.dateTime, 
                        title: action.payload.match.title, 
                        rinkNumber: action.payload.match.rinkNumber
                    }, 
                    teams: {
                        team1: {
                            team1Name: action.payload.teams.team1.team1Name,
                            players: action.payload.teams.team1.players
                        }, team2: {
                            team2Name: action.payload.teams.team2.team2Name, 
                            players: action.payload.teams.team2.players
                        }, scores: action.payload.teams.scores,
                        finalscore: {
                            team1Score: action.payload.teams.finalscore.team1Score,
                            team2Score: action.payload.teams.finalscore.team2Score,
                            winner: action.payload.teams.finalscore.winner
                        }
                    }
                }
            ];
        case actionTypes.update:
            return state.map((item) => {
                if (item.id === action.payload.id) return action.payload;
                return item;
            });
        case actionTypes.delete:
            return state.filter((item) => item.id !== action.payload.id);
        case actionTypes.save:
            try {
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            }
            catch (error) {
                console.log(error);
            }
            finally {
                return state;
            }
        case actionTypes.load:
            return [
                ...state, {
                    id: action.payload.id,
                    match: {
                        dateTime: action.payload.match.dateTime, 
                        title: action.payload.match.title,
                        rinkNumber: action.payload.match.rinkNumber
                    }, 
                    teams: {
                        team1: {
                            team1Name: action.payload.teams.team1.team1Name,
                            players: action.payload.teams.team1.players
                        }, team2: {
                            team2Name: action.payload.teams.team2.team2Name, 
                            players: action.payload.teams.team2.players
                        }, scores: action.payload.teams.scores,
                        finalscore: {
                            team1Score: action.payload.teams.finalscore.team1Score,
                            team2Score: action.payload.teams.finalscore.team2Score,
                            winner: action.payload.teams.finalscore.winner
                        }
                    }
                }
            ];
        default:
            return state;
    };
};

export const ItemProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialScorecardState);
    useEffect(() => {
        const loadStorage = async () => {
            const storage = await AsyncStorage.getItem(STORAGE_KEY);
            if (storage !== null && state.length === 0) {
                initialScorecardState = JSON.parse(storage);
                initialScorecardState.forEach(element => {
                    dispatch({type: actionTypes.load, payload: element});
                });
            }
        }
        loadStorage();
    }, [STORAGE_KEY]);
    const addItem = (id, match, teams, callback) => {
        dispatch({type: actionTypes.create, payload: {id, match, teams}});
        dispatch({type: actionTypes.save});
        if (callback) callback();
    };
    const deleteItem = (id, callback) => {
        dispatch({type: actionTypes.delete, payload: {id: id}});
        dispatch({type: actionTypes.save});
        if (callback) callback();
    };
    const updateItem = (id, match, teams, callback) => {
        dispatch({type: actionTypes.update, payload: {id, match, teams}});
        dispatch({type: actionTypes.save});
        if (callback) callback();
    };
    return (
        <ItemContext.Provider value={{
            state: state,
            create: addItem,
            remove: deleteItem,
            update: updateItem
        }}>
            {children}
        </ItemContext.Provider>
    );
};

export default ItemContext;