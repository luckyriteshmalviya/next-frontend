export default function FooterForGetHired({ ...props }) {
  return (
    <div className="footer-container">
      <div className="footer-background">
        <img src="./assets/images/Line 5.svg" />
      </div>
      <div className="footer-background-mobile-view">
        <img src="./assets/images/Lines.svg" />
      </div>
      <div className="footer-main-container">
        <div className="footer-top">
          <div className={`footer-top-left-part ${props.animate && "animate"}`}>
            Apply to over 300 companies all at once!
          </div>

          <div
            className={`footer-top-right-part ${props.animate && "animate"}`}
          >
            We ensure your next step is a step forward. That’s why we are
            building a space that reinvents the entire job management processes.
            <br />
            So that you can just say “Mopid.me”!
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-bottom-blocks">
            <div>
              <div className="footer-bottom-block-number">1</div>
            </div>
            <div>
              <div className="footer-bottom-block-title">Register</div>
              <div className="footer-bottom-block-description">
                Fill out the details to get started with your profile.
              </div>
            </div>
          </span>
          <span className="footer-bottom-blocks">
            <div>
              <div className="footer-bottom-block-number">2</div>
            </div>
            <div>
              <div className="footer-bottom-block-title">Take Assessment</div>
              <div className="footer-bottom-block-description">
                Get ready to embark a journey which will shape you
                professionally and personally
              </div>
            </div>
          </span>
          <span className="footer-bottom-blocks footer-bottom-lastBlock">
            <div>
              <div className="footer-bottom-block-number">3</div>
            </div>
            <div className="footer-bottom-block-title">
              Up Your Future
              <div className="footer-bottom-block-description">
                Voila! There’s no turning back from here! Welcome to the future.
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
