import {MenuItem} from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Admin',
    isTitle: true
  },
  {
    id: 2,
    label: 'Dashboard',
    icon: 'bx-home-circle',
    link: '/dashboard',
  },
  {
    id: 3,
    label: 'Company Admin',
    isTitle: true
  },

  {
    id: 4,
    label: 'Multi Level Menu',
    icon: 'bx-share-alt',
    subItems: [
      {
        id: 126,
        label: 'Multi Level Menu LEVEL1.1',
        link: '#',
        parentId: 125
      },
      {
        id: 127,
        label: 'Multi Level Menu LEVEL1.2',
        parentId: 125,
        subItems: [
          {
            id: 128,
            label: 'Multi Level Menu LEVEL1.LEVEL2.1',
            parentId: 127,
          },
          {
            id: 129,
            label: 'Multi Level Menu LEVEL1.LEVEL2.2',
            parentId: 127,
          }
        ]
      },
    ]
  }
];

