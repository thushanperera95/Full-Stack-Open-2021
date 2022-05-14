import { React } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { showToggle, hideToggle } from "../reducers/toggleReducer";
import { Button } from "@mui/material";

const Togglable = (props) => {
  var dispatch = useDispatch();
  const toggle = useSelector((state) => state.toggles[props.id]);

  const showWhenHidden = { display: !toggle ? "" : "none" };
  const showWhenVisible = { display: !toggle ? "none" : "" };

  return (
    <div>
      <div style={showWhenHidden}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(showToggle(props.id))}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => dispatch(hideToggle(props.id))}
        >
          cancel
        </Button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  id: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
