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
    project: {
      home: "/dashboard/project",
      add: "/dashboard/project/add",
      view(projectUID) {
        return `/dashboard/project/${projectUID}`;
      },
      edit(projectUID) {
        return `/dashboard/project/${projectUID}/edit`;
      }
    },
    profile: "/dashboard/profile",
    account: "/dashboard/account"
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
