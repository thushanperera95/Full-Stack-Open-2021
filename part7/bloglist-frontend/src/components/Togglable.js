import { React } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { showToggle, hideToggle } from "../reducers/toggleReducer";

const Togglable = (props) => {
  var dispatch = useDispatch();
  const toggle = useSelector((state) => state.toggles[props.id]);

  const showWhenHidden = { display: !toggle ? "" : "none" };
  const showWhenVisible = { display: !toggle ? "none" : "" };

  return (
    <div>
      <div style={showWhenHidden}>
        <button onClick={() => dispatch(showToggle(props.id))}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => dispatch(hideToggle(props.id))}>cancel</button>
      </div>
    </div>
  );
};

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  id: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
