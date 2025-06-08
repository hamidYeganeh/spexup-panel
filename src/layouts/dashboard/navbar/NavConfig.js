// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import { GoProject } from 'react-icons/go';
import { CiTextAlignLeft } from 'react-icons/ci';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaUserFriends } from 'react-icons/fa';
import { FaNetworkWired } from 'react-icons/fa6';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  project: <GoProject />,
  blog: <CiTextAlignLeft />,
  category: <BiCategoryAlt />,
  user: <FaUserFriends />,
  duty: <FaNetworkWired />,
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    // subheader: 'general v3.3.0',
    items: [
      // { title: 'User', path: '/dashboard/user/list', icon: ICONS.dashboard },
      { title: 'Project', path: '/dashboard/project/list', icon: ICONS.project },
      { title: 'Blog', path: '/dashboard/blog/list', icon: ICONS.blog },
      { title: 'Category', path: '/dashboard/category/list', icon: ICONS.category },
      { title: 'Contact', path: '/dashboard/contact/list', icon: ICONS.user },
      { title: 'Duty', path: '/dashboard/duty/list', icon: ICONS.duty },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'user',
  //       path: '/dashboard/user',
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Four', path: '/dashboard/user/four' },
  //         { title: 'Five', path: '/dashboard/user/five' },
  //         { title: 'Six', path: '/dashboard/user/six' },
  //       ],
  //     },
  //   ],
  // },
];

export default sidebarConfig;
