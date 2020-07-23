import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo from "../images/logo.png";

import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import PropTypes from "prop-types";

import axios from "axios";

import { connect } from "react-redux";
import { signUpUser, logoutUser } from "../redux/actions/userActions";
const styles = {
  form: {
    textAlign: "center",
  },
  img: {
    height: 75,
    width: 75,
    margin: "10px auto 10px auto",
  },
  pageTitle: {
    margin: "5px auto 5px auto",
  },
  button: {
    marginTop: 20,
  },
  textField: {
    margin: "5px auto 5px auto",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
  },
  spinner: {
    margin: 10,
  },
};
export class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      laoding: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signUpUser(newUserData, this.props.history);
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={Logo} alt="Logo" className={classes.img}></img>
          <Typography variant="h5" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
              fullWidth
            ></TextField>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              helperText={errors.password}
              error={errors.password ? true : false}
              fullWidth
            ></TextField>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              fullWidth
            ></TextField>
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle Name"
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              fullWidth
            ></TextField>
            {errors.general ? (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            ) : (
              ""
            )}
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              color="secondary"
              disabled={loading}
            >
              Signup
            </Button>
            <br></br>

            {this.state.laoding ? (
              <CircularProgress className={classes.spinner} color="secondary" />
            ) : (
              ""
            )}
            <br></br>
            <span>
              Not have an account then Signup <Link to="/signup">Here</Link>
            </span>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signUpUser })(
  withStyles(styles)(Signup)
);
