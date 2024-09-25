import actionTypes from "./actionTypes";
import { getAllCodeServices, createNewUserService } from "../../services/userService";

// Fetch Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      setTimeout(async () => {
        let response = await getAllCodeServices("GENDER");
        if (response && response.errCode === 0) {
          dispatch(fetchGenderSuccess(response.data));
        } else {
          dispatch(fetchGenderFailed());
        }
      }, 5000);
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

// Fetch Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      setTimeout(async () => {
        let response = await getAllCodeServices("POSITION");
        if (response && response.errCode === 0) {
          dispatch(fetchPositionSuccess(response.data));
        } else {
          dispatch(fetchPositionFailed());
        }
      }, 5000);
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log(error);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

// Fetch RoleId
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      setTimeout(async () => {
        let response = await getAllCodeServices("ROLE");
        if (response && response.errCode === 0) {
          dispatch(fetchRoleSuccess(response.data));
        } else {
          dispatch(fetchRoleFailed());
        }
      }, 5000);
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log(error);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode === 0) {
        dispatch(createNewUserSuccess());
      } else {
        dispatch(createNewUserFailed());
      }
    } catch (error) {
      dispatch(createNewUserFailed());
      console.log("create new user failed", error);
    }
  };
};
export const createNewUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const createNewUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});
