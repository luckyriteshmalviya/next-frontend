export default function FooterForHire({ animate }) {
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
          <div
            className={`footer-top-left-part-for-hire recruite ${
              animate && "animate"
            }`}
          >
            Guaranteed pre-vetted candidates with 1 in every 4 being an ideal
            fit for your requirements!
          </div>

          <div
            className={`footer-top-right-part-for-hire candidate ${
              animate && "animate"
            }`}
          >
            Mopid is committed to provide its clients with pre-vetted candidates
            in their preferred location. We guarantee results without the hassle
            of posting job descriptions and have a network of curated candidates
            that are just waiting for you to find them on Mopid and help you
            make your dream hire.
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
              <div className="footer-bottom-block-title">
                Specify requirements
              </div>
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
              We’ll get in touch!
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
