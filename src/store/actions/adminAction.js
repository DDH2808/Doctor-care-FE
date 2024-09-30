import actionTypes from "./actionTypes";
import {
  getAllCodeServices,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
} from "../../services/userService";
import { toast } from "react-toastify";

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

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode === 0) {
        toast.success("Create a new user succeed!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
      console.log("Create new user failed", error);
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllUsers("ALL");
      if (response && response.errCode === 0) {
        dispatch(fetchAllUserSuccess(response.users.reverse()));
      } else {
        toast.error("Fetch all users error!");
        dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      toast.error("Fetch all users error!");
      dispatch(fetchAllUserFailed());
      console.log("Fetch all user redux failed", error);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let response = await deleteUserService(userId);
      if (response && response.errCode === 0) {
        toast.success("Delete the user succeed!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete the user error!");
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      toast.error("Delete the user error!");
      dispatch(deleteUserFailed());
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const editUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await editUserService(data);
      if (response && response.errCode === 0) {
        toast.success("Update the user succeed!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Update the user error!");
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.error("Update the user error!");
      dispatch(editUserFailed());
    }
  };
};
export const editUserSuccess = (data) => ({
  type: actionTypes.EDIT_USER_SUCCESS,
  data: data,
});
export const editUserFailed = (data) => ({
  type: actionTypes.EDIT_USER_FAILED,
  data: data,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getTopDoctorHomeService("");
      if (response && response.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: response.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (error) {
      console.log("FETCH_TOP_DOCTORS_FAILED: ", error);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllDoctors();
      if (response && response.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDoctors: response.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (error) {
      console.log("FETCH_ALL_DOCTORS_FAILED: ", error);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};

export const saveDetailInforDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await saveDetailDoctor(data);
      console.log("123 ", response);
      if (response && response.errCode === 0) {
        toast.success("Save Infor Detail Doctor succeed!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_INFO_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save Infor Detail Doctor error!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_INFO_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      toast.error("Save Infor Detail Doctor error!");
      console.log("SAVE_DETAIL_INFO_DOCTOR_FAILED: ", error);
      dispatch({
        type: actionTypes.SAVE_DETAIL_INFO_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllCodeServices("TIME");
      if (response && response.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: response.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (error) {
      console.log("FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ", error);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};
