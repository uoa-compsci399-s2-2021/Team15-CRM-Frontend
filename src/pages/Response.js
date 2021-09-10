import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
import { getJobInfo } from '../apis/index';
//

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default function EcommerceShop() {
  const classes = useStyles();
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // const [sendEmail, setSendEmail] = useState(false);
  const [value, setValue] = React.useState(0);
  const [handleEvent, setHandleEvent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getJobInfo();
      try {
        let dataList = [];
        response.data.forEach((element) => {
          // get completed form
          if (element.isCompleted) {
            dataList.push(element);
          }
        });
        setData(dataList.reverse());
        console.log(data);
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
  }, [handleEvent]);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <Page title="Dashboard: Products | Atech+">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Response
        </Typography>
        <Grid item xs={12}>
          <Paper className={classes.tab}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="In progress" />
              <Tab label="Accepted" />
            </Tabs>
          </Paper>
        </Grid>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          {/* <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack> */}
        </Stack>

        {data === null ? (
          <div className={classes.root}>
            <img src="/images/waiting.gif" alt="loading" />
          </div>
        ) : (
          <div>
            {value === 0 ? (
              <ProductList products={data.filter((job) => !job.isActive)} isActive={false} setHandleEvent={setHandleEvent} handleEvent={handleEvent} />
            ) : (
              <ProductList products={data.filter((job) => job.isActive)} isActive={true} setHandleEvent={setHandleEvent} handleEvent={handleEvent} />
            )}
          </div>
        )}

        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
