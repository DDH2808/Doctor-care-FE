import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="section-title">Bác sĩ nổi bật tuần qua</span>
            <button className="btn-view-more">XEM THÊM</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div className="outstanding-doctor-item" key={index}>
                      <div
                        className="outstanding-doctor-img"
                        style={{
                          background: `url(${imageBase64})`,
                          height: "150px",
                          width: "150px",
                          borderRadius: "50%",
                          backgroundPosition: "center center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundColor: "#eee",
                          margin: "0 auto",
                        }}
                      ></div>
                      <div className="outstanding-doctor-name">
                        {language && language === LANGUAGES.EN
                          ? nameEn
                          : nameVi}
                      </div>
                      <div className="outstanding-doctor-facility">
                        Nam Khoa
                      </div>
                    </div>
                  );
                })}
              {/* <div className="outstanding-doctor-item">
                <div className="outstanding-doctor-img"></div>
                <div className="outstanding-doctor-name">
                  Bác sĩ Chuyên khoa II Trần Minh Khuyên
                </div>
                <div className="outstanding-doctor-facility">Nam Khoa</div>
              </div>
              <div className="outstanding-doctor-item">
                <div className="outstanding-doctor-img"></div>
                <div className="outstanding-doctor-name">
                  Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
                </div>
                <div className="outstanding-doctor-facility">Da liễu</div>
              </div>
              <div className="outstanding-doctor-item">
                <div className="outstanding-doctor-img"></div>
                <div className="outstanding-doctor-name">
                  Bác sĩ chuyên khoa II Trần Thị Hoài Hương
                </div>
                <div className="outstanding-doctor-facility">Da liễu</div>
              </div>
              <div className="outstanding-doctor-item">
                <div className="outstanding-doctor-img"></div>
                <div className="outstanding-doctor-name">
                  Giáo sư, Tiến sĩ Hà Văn Quyết
                </div>
                <div className="outstanding-doctor-facility">Tiêu hóa</div>
              </div>
              <div className="outstanding-doctor-item">
                <div className="outstanding-doctor-img"></div>
                <div className="outstanding-doctor-name">
                  Bác sĩ Chuyên khoa II Trần Minh Khuyên
                </div>
                <div className="outstanding-doctor-facility">Nam Khoa</div>
              </div>
              <div className="outstanding-doctor-item">
                <div className="outstanding-doctor-img"></div>
                <div className="outstanding-doctor-name">
                  Bác sĩ Chuyên khoa II Trần Minh Khuyên
                </div>
                <div className="outstanding-doctor-facility">Nam Khoa</div>
              </div> */}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
