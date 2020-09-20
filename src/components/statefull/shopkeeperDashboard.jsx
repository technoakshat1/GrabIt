import React from 'react'

function ShopkeeperDashboard() {
    return (
        <div>
            <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <div className="dashboard-card visit-card-gradient">
          <h1 className="visit-heading">Total visits this year</h1>
          <h1 className="visit-count">
            <animated.span>
              {numProp.number.to((number) => Math.floor(number))}
            </animated.span>
          </h1>
        </div>
        <div className="dashboard-card expense">
          <div className="expense-circle-container">
            <animated.svg
              className="expense-circle"
              width="140"
              height="140"
              //style={{marginBottom:"4rem"}}
            >
              <circle
                r="35%"
                cx="50%"
                cy="50%"
                fill="transparent"
                stroke-dasharray="565.48"
                stroke-dashoffset="0"
              ></circle>
              <animated.circle
                className="expense-circle-bar"
                r="35%"
                cx="50%"
                cy="50%"
                fill="transparent"
                //stroke-dashoffset="300"
                style={progressProps}
              ></animated.circle>
            </animated.svg>
            <div className="expense-text">
              <h4 className="expense-heading">Expense in 2020</h4>
              <h2 style={{ margin: "auto" }}>
                ₹{" "}
                <animated.span>
                  {expenseProps.number.to((number) => Math.floor(number))}
                </animated.span>
                /200
              </h2>
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}

export default ShopkeeperDashboard
