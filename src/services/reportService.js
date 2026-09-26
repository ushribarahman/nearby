import api from "./api";

export default {
  reasons: () => api("/reports/reasons"),
  submit: ({ targetType, targetId, reason, details }) =>
    api("/reports", {
      method: "POST",
      body: JSON.stringify({ targetType, targetId, reason, details }),
    }),
};
