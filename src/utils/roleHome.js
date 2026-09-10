// Central place that decides where a logged-in user "belongs" based on role.
// Used by every route guard so organizer/admin/user redirects stay consistent.
export function getRoleHome(role) {
  if (role === "organizer") return "/organizer/dashboard";
  if (role === "admin") return "/admin/dashboard";
  return "/";
}
