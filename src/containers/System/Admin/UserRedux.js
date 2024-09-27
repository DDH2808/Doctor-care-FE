import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions/adminAction";
import "./UserRedux.scss";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImageUrl: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      roleId: "",
      positionId: "",
      avatar: "",

      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        positionId:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGender = this.props.genderRedux;
      let arrPosition = this.props.positionRedux;
      let arrRole = this.props.roleRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        positionId:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        previewImageUrl: "",
      });
    }
  }

  handleImageChange = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (data) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImageUrl: objectUrl,
        avatar: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImageUrl) return;
    this.setState({ isOpen: true });
  };

  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };
  handleValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`Missing parameter: ${arrInput[i]}`);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.handleValidateInput();
    if (isValid === false) return;

    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      // fire redux create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.positionId,
        avatar: this.state.avatar,
      });
    } else if (action === CRUD_ACTIONS.EDIT) {
      // fire redux edit user
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        positionId: this.state.positionId,
        avatar: this.state.avatar,
      });
    }
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      roleId: user.roleId,
      positionId: user.positionId,
      avatar: "",
      previewImageUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let language = this.props.language;
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let isLoadingGender = this.props.isLoadingGender;
    let isLoadingPosition = this.props.isLoadingPosition;
    let isLoadingRole = this.props.isLoadingRole;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      gender,
      roleId,
      address,
      positionId,
    } = this.state;

    return (
      <div className="user-redux-container">
        <div className="title">Manage User Redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 title">
                <FormattedMessage id="admin.manage-user.add-user" />
              </div>
              <div className="col-12">
                {isLoadingGender === true &&
                isLoadingPosition === true &&
                isLoadingRole === true
                  ? "Loading Data"
                  : ""}
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email..."
                  name="email"
                  value={email}
                  onChange={(event) => this.handleOnchangeInput(event, "email")}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password..."
                  name="password"
                  value={password}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "password")
                  }
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.first-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter first name..."
                  name="firstName"
                  value={firstName}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "firstName")
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.last-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter last name..."
                  name="lastName"
                  value={lastName}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "lastName")
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.phone" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter phone Number..."
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "phoneNumber")
                  }
                />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="admin.manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter address..."
                  name="address"
                  value={address}
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "address")
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  name="gender"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "gender")
                  }
                  value={gender}
                >
                  <option>Choose...</option>
                  {genders &&
                    genders.length > 0 &&
                    genders.map((items, index) => {
                      return (
                        <option key={index} value={items.keyMap}>
                          {language === LANGUAGES.VI
                            ? items.valueVi
                            : items.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.role-id" />
                </label>
                <select
                  className="form-control"
                  name="roleId"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "roleId")
                  }
                  value={roleId}
                >
                  <option>Choose...</option>
                  {roles &&
                    roles.length > 0 &&
                    roles.map((items, index) => {
                      return (
                        <option key={index} value={items.keyMap}>
                          {language === LANGUAGES.VI
                            ? items.valueVi
                            : items.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.position-id" />
                </label>
                <select
                  className="form-control"
                  name="positionId"
                  onChange={(event) =>
                    this.handleOnchangeInput(event, "positionId")
                  }
                  value={positionId}
                >
                  <option>Choose...</option>
                  {positions &&
                    positions.length > 0 &&
                    positions.map((items, index) => {
                      return (
                        <option key={index} value={items.keyMap}>
                          {language === LANGUAGES.VI
                            ? items.valueVi
                            : items.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.image" />
                </label>
                <div className="image-container">
                  <span className="upload-image">
                    <input
                      type="file"
                      id="load-image"
                      hidden
                      onChange={(event) => this.handleImageChange(event)}
                    />
                    <label className="btn-upload" htmlFor="load-image">
                      Tải ảnh
                      <i className="fas fa-upload"></i>
                    </label>
                  </span>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImageUrl})`,
                    }}
                    onClick={() => {
                      this.openPreviewImage();
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => {
                    this.handleSaveUser();
                  }}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="admin.manage-user.update" />
                  ) : (
                    <FormattedMessage id="admin.manage-user.save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParentKey={this.handleEditUserFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImageUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,

    isLoadingGender: state.admin.isLoadingGender,
    isLoadingPosition: state.admin.isLoadingPosition,
    isLoadingRole: state.admin.isLoadingRole,

    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux: (data) => dispatch(actions.editUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
