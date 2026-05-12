import api from "./api";

export const createAdmin = async (collegeId, email, password) => {
  // This calls the new API I just made!
  const response = await api.post("/tenants/create-college-admin/", {
    organization_id: collegeId,
    email: email,
    password: password,
    first_name: "John",
    last_name: "Doe"
  });
  alert(response.data.message);
};
