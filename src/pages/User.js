import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';

import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// components
import { getEmpolyerDeleteInfo } from '../apis';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import { convertFirstCharacterAllWordsToUppercase } from '../utils/formatString';
//
import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Job Title', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'email', label: 'Contact Email', alignRight: false },
  { id: 'info', label: 'Message', alignRight: false },
  { id: '' }
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [InfoList, setInfoList] = useState([]);
  const [open, setOpen] = useState(false);
  const [DeleteReason, setDeleteReason] = useState('');
  const [loading, setloading] = useState(false);
  const handleClickOpen = (DeleteReason) => {
    setOpen(true);
    setDeleteReason(DeleteReason);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - InfoList.length) : 0;

  const filteredUsers = applySortFilter(InfoList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  useEffect(() => {
    setloading(true);
    const fetchData = async () => {
      const response = await getEmpolyerDeleteInfo();
      try {
        setInfoList(response.data.reverse());
        setloading(false);
        // console.log(response.data);
      } catch (e) {
        console.error(e);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  const CardInfo = (
    <Card>
      <UserListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={USERLIST.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {InfoList != null && (
                <>
                  {InfoList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                    (job, idx) => (
                      <TableRow hover key={job.idx} tabIndex={-1} role="checkbox">
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="subtitle2" noWrap>
                            {convertFirstCharacterAllWordsToUppercase(job.CompanyName)}
                          </Typography>
                        </TableCell>

                        <TableCell align="left">
                          {convertFirstCharacterAllWordsToUppercase(job.RequestedEmail)}
                        </TableCell>

                        <TableCell align="left">
                          {job.DeleteReason.length > 30
                            ? job.DeleteReason.substring(0, 30) + '...'
                            : job.DeleteReason}
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            variant="outlined"
                            onClick={() => handleClickOpen(job.DeleteReason)}
                          >
                            View
                          </Button>
                        </TableCell>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          fullWidth
                        >
                          <DialogTitle disableTypography justify="center" justifyContent="center">
                            Reason for deleting this job
                          </DialogTitle>
                          <DialogContent dividers>
                            <DialogContentText id="alert-dialog-description">
                              {DeleteReason}
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button variant="contained" autoFocus onClick={handleClose}>
                              Back
                            </Button>
                          </DialogActions>
                        </Dialog>

                        <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </>
              )}
            </TableBody>
            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={InfoList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );

  return (
    <Page title="Information | Atech+">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Information from employers
          </Typography>
        </Stack>

        {loading === true ? (
          <div className={classes.root}>
            <img src="/images/waiting.gif" alt="loading" />
          </div>
        ) : (
          <div>{CardInfo}</div>
        )}
      </Container>
    </Page>
  );
}
