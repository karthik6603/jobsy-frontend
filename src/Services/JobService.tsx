import axiosInstance from "../Interceptor/AxiosInterceptor";

const base_url = "http://localhost:8080/jobs/";
const postJob = async (job: any) => {
  return axiosInstance
    .post(`/jobs/post`, job)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};
const getAllJobs = async () => {
  return axiosInstance
    .get(`/jobs/get-all`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};
const getJob = async (id: any) => {
  return axiosInstance
    .get(`/jobs/get/${id}`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};
const applyJob = async (id: any, applicant: any) => {
  return axiosInstance
    .post(`/jobs/apply/${id}`, applicant)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};
const getJobPostedBy = async (id: any) => {
  return axiosInstance
    .get(`/jobs/posted-by/${id}`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};
const changeAppStatus = async (application: any) => {
  return axiosInstance
    .post(`/jobs/change-app-status`, application)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

export {
  postJob,
  getAllJobs,
  getJob,
  applyJob,
  getJobPostedBy,
  changeAppStatus,
};
