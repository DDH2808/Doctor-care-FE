import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-container">
          <div className="section-header">
            <div className="section-title">Truyền thông nói về BookingCare</div>
          </div>
          <div className="section-body">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Cj_LlSOAEjo?si=hc43EzwaBl5FKtGj"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <div className="about-description">
              <span>
                Lorem ipsum dolor sit amet. Eos tenetur quia et placeat esse et
                similique voluptas et delectus reprehenderit quo nihil nisi. Qui
                dolorum iusto est internos consequuntur ut quas odit qui ratione
                voluptas. Et perspiciatis animi ut fugit maiores et delectus
                quaerat non eveniet molestiae.
              </span>
              <span>
                Cum soluta excepturi in minima consequatur qui facere distinctio
                et tempora tenetur. Et sunt maxime rem odio sequi ut officiis
                dolorem et nemo eaque quo quia delectus? Aut amet temporibus est
                nulla natus hic asperiores voluptatum et impedit dolorem quo
                beatae perspiciatis. Qui deserunt esse hic ipsum tempore et
                minus harum At omnis saepe qui consequuntur sequi aut rerum
                internos.
              </span>
              <span>
                Ut dolores corrupti vel voluptatem explicabo qui corrupti
                beatae. Rem modi aliquid et vitae maiores sed voluptatibus
                voluptatem non voluptatibus dolorem eum fugiat molestiae et
                consequatur unde nam sapiente assumenda. Ut enim doloremque sit
                tempore Quis eum esse earum et aspernatur consequuntur et
                corporis inventore ut facere voluptatem ea dolor voluptatum. Non
                voluptas facilis et fuga quos est iure necessitatibus.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
