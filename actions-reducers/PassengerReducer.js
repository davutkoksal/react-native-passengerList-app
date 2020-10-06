import { SET_SİZE } from "./PassengerActions";
export const FETCH_PASSENGERS = "FETCH_PASSENGERS";

initialState = {
  passengerList: [],
  size: 10,
};
export default function PassengerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PASSENGERS:
      return { ...state, passengerList: action.payload };
    case SET_SİZE:
      return { ...state, size: action.payload };
    default:
      return state;
  }
}
