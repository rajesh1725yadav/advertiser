const menu = [
  // {
  //   icon: "dashlite",
  //   text: "Default Dashboard",
  //   link: "/",
  // },
  // {
  //   icon: "bitcoin-cash",
  //   text: "Crypto Dashboard",
  //   link: "/crypto",
  // },
  // {
  //   icon: "growth",
  //   text: "Analytics Dashboard",
  //   link: "/analytics",
  // },
  {
    icon: "home",
    text: "Dashboard",
    link: "/",
    extUrl: false,
  },
  // {
  //   heading: "Navigation",
  // },
  {
    icon: "tile-thumb",
    text: "Campaigns",
    link: "/campaigns",
    active: false,
    extUrl: false,
    // subMenu: [
    //   {
    //     text: "Project Cards",
    //     link: "/project-card",
    //   },
    //   {
    //     text: "Project List",
    //     link: "/project-list",
    //   },
    // ],
  },
  {
    icon: "wallet",
    text: "Wallet",
    link: "/wallet",
    active: false,
    extUrl: false,
  },
  {
    icon: "emails",
    text: "Inbox",
    link: "/inbox",
    active: false,
    extUrl: false,
  },
  {
    icon: "user-circle",
    text: "Profile",
    link: "/profile",
    active: false,
    extUrl: false,
  },
  {
    icon: "growth",
    text: "Statistics",
    link: "/report",
    active: false,
    extUrl: false,
  },
  // {
  //   icon: "na",
  //   text: "Blocked IPs",
  //   link: "/block-ip",
  //   active: false,
  //   extUrl: false,
  // },
  {
    icon: "account-setting-alt",
    text: "Support",
    link: "/support",
    active: false,
    extUrl: false,
  },
  {
    icon: "help",
    text: "Help & Guide",
    link: "https://www.7searchppc.com/docs/",
    active: false,
    newTab: true,
    extUrl: true,
  }
];
export default menu;
