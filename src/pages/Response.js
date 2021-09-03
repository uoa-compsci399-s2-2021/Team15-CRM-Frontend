import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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
    justifyContent: 'center',
  }
}));

export default function EcommerceShop() {
  const classes = useStyles();
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [sendEmail, setSendEmail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getJobInfo();
      try {
        let dataList = [];
        (response.data).forEach((element) => {
          if (element.isCompleted) {
            dataList.push(element);
          }
        });
        setData((dataList).reverse());
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
  }, [sendEmail]);

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

  return (
    <Page title="Dashboard: Products | Atech+">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Response
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        {data === null ? (
          <div className={classes.root}>
            <img src="/images/waiting.gif" alt="loading" />
          </div>
        ) : (
          <ProductList products={data} />
        )}

        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
