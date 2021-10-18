// material
import { Grid, Button, Container, Stack, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import Setting from '../components/_dashboard/setting/Setting';

// ----------------------------------------------------------------------

export default function NotificationSettings() {
  return (
    <Page title="Dashboard: Setting | Atech+">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Notification settings
          </Typography>
        </Stack>

        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid sx={{ minWidth: 800 }}>
            <Setting />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
