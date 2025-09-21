export const navItems = [
  {
    label: 'Rólunk',
    href: '/rolunk',
    subItems: [
      { label: 'Intézmény', href: '/rolunk/intezmeny' },
      { label: 'Közösség', href: '/rolunk/kozosseg' },
      { label: 'Galéria', href: '/galeria' },
    ],
  },
  {
    label: 'Szakma',
    href: '/szakma',
    /*subItems: [
      { label: 'Nemzetközi kapcsolataink', href: '/szakma/nemzetkozi-kapcsolatok' },
    ],*/
  },
  { label: 'Társasadalmi felelősségvállalás', href: '/social-responsibility' },
  {
    label: 'Díjak',
    href: '/awards',
    subItems: [
      { label: 'John von Neumann Award', href: '/awards/neumann' },
      { label: 'Herbert Simon Award', href: '/awards/herbert' },
      { label: 'Kaliforniától Budapestig', href: '/awards/california' },
    ],
  },
  { label: '', href: '/international-relations' },
  { label: 'Felvételi', href: '/felveteli', bordered: true },
  { label: 'Támogatás', href: '/tamogass', bordered: true },
];
