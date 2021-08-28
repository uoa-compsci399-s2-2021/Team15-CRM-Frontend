import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';
import logo from './Alogo.png';
// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src={logo} sx={{ width: 60, height: 60, ...sx }} />;
}
