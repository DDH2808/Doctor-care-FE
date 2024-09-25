import actionTypes from "./actionTypes";
import {
  getAllCodeServices,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
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
        dispatch(fetchAllUserStart("ALL"));
      } else {
        toast.success("Delete the user error!");
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      toast.success("Delete the user error!");
      dispatch(deleteUserFailed());
      console.log("Delete user redux failed", error);
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
    let response = await editUserService(data);
    try {
      if (response && response.errCode === 0) {
        dispatch(
          editUserSuccess({
            vi: "Cập nhật dùng thành công",
            en: "Update user success!",
            errType: "success",
          })
        );
        dispatch(fetchAllUserStart("ALL"));
      } else {
        console.log("cn2");
        dispatch(
          editUserFailed({
            vi: "Cập nhật dùng không thành công",
            en: "Update user failed!",
            errType: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        editUserFailed({
          vi: "Cập nhật dùng không thành công",
          en: "Update user failed!",
          errType: "error",
        })
      );
      console.log("Delete user redux failed", error);
    }
  };
};
export const editUserSuccess = (data) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  data: data,
});
export const editUserFailed = (data) => ({
  type: actionTypes.UPDATE_USER_FAILED,
  data: data,
});
