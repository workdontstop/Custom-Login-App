import { Grid, Button } from "@material-ui/core";
import { ILogin } from "./appFolder-Interfaces";

export function LoginButtons({
  loginclass,
  signupclass,
  match,
  OpenModalForm,
}: ILogin) {
  return (
    <Grid
      container
      className={match ? "containerloginpc" : "containerloginmobile "}
      item
      xs={12}
    >
      <Grid item sm={4} md={5}></Grid>
      <Grid item className="buttonpad buttonshake" xs={12} sm={4} md={2}>
        <Button
          onMouseDown={() => OpenModalForm(1)}
          className={loginclass}
          fullWidth={true}
          variant="outlined"
          size="large"
          color="primary"
        >
          Log In
        </Button>
      </Grid>
      <Grid item sm={12} className="logbuttonspace"></Grid>

      <Grid item sm={4} md={5}></Grid>
      <Grid item className="buttonpad buttonshake" xs={12} sm={4} md={2}>
        <Button
          onMouseDown={() => OpenModalForm(0)}
          className={signupclass}
          fullWidth={true}
          variant="contained"
          size="large"
          color="secondary"
        >
          {" "}
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
}
