export const routePaths = {
  // Marketing Page
  home: "/",
  // Authentication Routes
  auth: {
    login: "/auth",
    register: "/auth/register",
    register2: "/auth/register/2",
    forgotPassword: "/auth/forgot-password"
  },
  // Dashboard
  dashboard: {
    home: "/dashboard",
    // Desired Dashboard routes
    // user: {
    //   account: "/dashboard/user/account",
    //   profile: "/dashboard/user/profile"
    // },
    // company: {
    //   account: "/dashboard/company/account",
    //   profile: "/dashboard/company/profile"
    // },
    // Temporary Dashboard routes
    account: "/dashboard/account",
    portfolio: {
      home: "/dashboard/portfolio",
      projects: {
        home: "/dashboard/portfolio/projects",
        add: "/dashboard/portfolio/projects/add",
        view(projectUID) {
          return `/dashboard/portfolio/projects/${projectUID}`;
        },
        edit(projectUID) {
          return `/dashboard/portfolio/projects/${projectUID}/edit`;
        }
      }
    }
  },
  admin: {
    home: "/admin"
  },
  error: {
    500: "/500"
  }
};

export const links = {
  // TODO, On launch, fix/tidy url if possible
  avatar:
    "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png"
};

export const userGroup = {
  user: {
    id: "MFQWhtzAFhBD92W8s59A",
    name: "Freelancer"
  },
  company: {
    id: "Q7E2pi4osxUunt2rLmiP",
    name: "Company"
  }
};
