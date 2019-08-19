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

export const userGroup = {
  groupA: {
    id: "MFQWhtzAFhBD92W8s59A",
    name: "GroupA"
  },
  groupB: {
    id: "Q7E2pi4osxUunt2rLmiP",
    name: "GroupB"
  }
};
