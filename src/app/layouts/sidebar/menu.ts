import {MenuItem} from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Admin',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'bx-home-circle',
    link: '/dashboard',
  },
  {
    label: 'Users',
    icon: 'bx-bx-user',
    link: '/users/lists',
  },
  /*{
    label: 'Company Admin',
    isTitle: true
  },

  {
    label: 'Multi Level Menu',
    icon: 'bx-share-alt',
    subItems: [
      {
        label: 'Multi Level Menu LEVEL1.1',
        link: '#',
        parentId: 125
      },
      {
        label: 'Multi Level Menu LEVEL1.2',
        parentId: 125,
        subItems: [
          {
            label: 'Multi Level Menu LEVEL1.LEVEL2.1',
            parentId: 127,
          },
          {
            label: 'Multi Level Menu LEVEL1.LEVEL2.2',
            parentId: 127,
          }
        ]
      },
    ]
  }*/
];

