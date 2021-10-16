import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import settingFill from '@iconify/icons-eva/settings-2-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import cubeFill from '@iconify/icons-eva/cube-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: '/app/Dashboard',
    icon: getIcon(trendingUpFill)
  },
  {
    title: 'Send Form',
    path: '/app/sendForm',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Moderate Listings',
    path: '/app/response',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Deleted listings',
    path: '/app/information',
    icon: getIcon(cubeFill)
  },

  {
    title: 'Setting',
    path: '/app/setting',
    icon: getIcon(settingFill)
  }

  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
