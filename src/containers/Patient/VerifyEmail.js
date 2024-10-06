import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../HomePage/Header";
import "./VerifyEmail.scss";
import { postVerifyBookAppointment } from "../../services/userService";
import { FormattedMessage } from "react-intl";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let response = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });

      if (response && response.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: response.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: response && response.errCode ? response.errCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { statusVerify, errCode } = this.state;
    console.log("check state: ", this.state);
    return (
      <>
        <Header />
        <div className="verify-email-container">
          {statusVerify === false ? (
            <div>Loading data...</div>
          ) : (
            <div>
              {+errCode === 0 ? (
                <div className="infor-booking">
                  Xác nhận lịch hẹn thành công!
                </div>
              ) : (
                <div className="infor-booking">
                  Lịch hẹn không tồn tại hoặc đã được xác nhận!
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
