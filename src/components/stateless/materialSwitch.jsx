import React from "react";
import Switch from "react-switch";


function MaterialSwitch(props){
    return(
        <Switch
          onColor={`${props.onColor}`}
          className="darkTheme-switch"
          onHandleColor={`${props.onHandleColor}`}
          handleDiameter={26}
          checked={props.checked}
          onChange={props.onChange}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={props.height}//18
          width={props.width}//45
        />
    );
}

export default MaterialSwitch;