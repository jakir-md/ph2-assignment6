import { driver } from "driver.js";

const driverSteps = [
  {
    element: "#pageHeader",
    popover: {
      title: "Navigation Menu",
      description:
        "Use this menu to explore different sections of DigiWallet quickly and easily.",
    },
  },
  {
    element: "#Home",
    popover: {
      title: "Home",
      description:
        "Start here to see an overview of DigiWallet and access key actions at a glance.",
    },
  },
  {
    element: "#Features",
    popover: {
      title: "Features",
      description:
        "Discover all the powerful tools DigiWallet offers to make your transactions simple and secure.",
    },
  },
  {
    element: "#dashboard",
    popover: {
      title: "Dashboard",
      description:
        "Explore sendmoney, addmoney, cashout and many more services.",
    },
  },
  {
    element: "#ThemeController",
    popover: {
      title: "Theme Controller",
      description:
        "Switch between light and dark mode to personalize your DigiWallet experience.",
    },
  },
  {
    element: "#ProfileLogo",
    popover: {
      title: "Profile & Logout",
      description:
        "Click here to view your profile or securely log out of your account.",
    },
  },
  {
    element: "#register",
    popover: {
      title: "Sign Up",
      description: "Click here to create a new account.",
    },
  },
];

export const startTour = () => {
  const driverObj = driver({
    showProgress: true,
    allowClose: true,
    steps: driverSteps,
  });
  driverObj.drive();
};

