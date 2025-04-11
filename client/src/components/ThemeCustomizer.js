import React from 'react';


const ThemeCustomizer = () => {
  return (
    <div className="customize-theme">
      <div className="card">
        <h2>Customize your view</h2>
        <p>Manage your font size, color, and background</p>
        {/* Font Size */}
        <div className="font-size">
          <h4>Font Size</h4>
          <div>
            <h6>Aa</h6>
            <div className="choose-size">
              <span className="font-size-1 active"></span>
              <span className="font-size-2"></span>
              <span className="font-size-3"></span>
              <span className="font-size-4"></span>
              <span className="font-size-5"></span>
            </div>
            <h3>Aa</h3>
          </div>
        </div>
        {/* Font Color */}
        <div className="color">
          <h4>Color</h4>
          <div className="choose-color">
            <span className="color-1 active"></span>
            <span className="color-2"></span>
            <span className="color-3"></span>
            <span className="color-4"></span>
            <span className="color-5"></span>
          </div>
        </div>
        {/* Background Color */}
        <div className="background">
          <h4>Background</h4>
          <div className="choose-bg">
            <div className="bg-1 active">
              <span></span>
              <h5>Light</h5>
            </div>
            <div className="bg-2">
              <span></span>
              <h5>Dim</h5>
            </div>
            <div className="bg-3">
              <span></span>
              <h5>Light Out</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
