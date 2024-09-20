import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions/adminAction";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
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
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        positionId:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
      });
    }
  }

  render() {
    let language = this.props.language;
    let genders = this.state.genderArr;
    let role = this.state.roleArr;
    let position = this.state.positionArr;

    return (
      <div className="user-redux-container">
        <div className="title">Manage User Redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 title">
                <FormattedMessage id="admin.manage-user.add-user" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.email" />
                </label>
                <input type="email" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.password" />
                </label>
                <input type="password" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.first-name" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.last-name" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.phone" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="admin.manage-user.address" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="admin.manage-user.gender" />
                </label>
                <select className="form-control">
                  <option>Choose...</option>
                  {genders &&
                    genders.length > 0 &&
                    genders.map((items, index) => {
                      return (
                        <option key={index} value={items.valueVi}>
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
                <select className="form-control">
                  <option>Choose...</option>
                  {role &&
                    role.length > 0 &&
                    role.map((items, index) => {
                      return (
                        <option key={index} value={items.valueVi}>
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
                <select className="form-control">
                  <option>Choose...</option>
                  {position &&
                    position.length > 0 &&
                    position.map((items, index) => {
                      return (
                        <option key={index} value={items.valueVi}>
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
                <input type="text" className="form-control" />
              </div>
              <div className="col-12">
                <button className="btn btn-primary mt-3">
                  <FormattedMessage id="admin.manage-user.save" />
                </button>
              </div>
            </div>
          </div>
        </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
