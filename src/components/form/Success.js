import {
  Typography,
  Grid
} from '@material-ui/core';

export default function Success() {
  return (
    <Grid container spacing={2}>
      <Grid container justify="center" justifyContent="center">
        <Grid item>
          <img
            src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png"
            alt="Logo"
            style={{ maxWidth: '50vw', height: 'auto' }}
          />
        </Grid>
      </Grid>
      <Grid container justify="center" justifyContent="center">
        <Grid item align="center" xs={10} sm={10} md={7}>
          <Typography variant="h3">Thank you for your submission!</Typography>
        </Grid>
        <Grid item align="center" xs={10} sm={10} md={7}>
          <Typography variant="h3">You will notifiy you by email when it has been approved.</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
