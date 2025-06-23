import { useNavigate, useParams } from "react-router-dom";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPostedBy } from "../Services/JobService";

const PostedJobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await getJobPostedBy(user.id);
        setJobList(res);
        
        if (res?.length > 0) {
          const jobId = Number(id);
          const isValidId = !isNaN(jobId) && res.some((job: any) => job.id === jobId);

          if (!isValidId) {
            // Redirect to first valid job if current ID is invalid
            navigate(`/posted-jobs/${res[0].id}`, { replace: true });
            return;
          }

          setJob(res.find((job: any) => job.id === jobId));
        } else {
          setJob(null); // No jobs available
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    fetchJobs();
  }, [id, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-[100vh] bg-mine-shaft-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!job && jobList.length === 0) {
    return (
      <div className="min-h-[100vh] bg-mine-shaft-950 text-white flex items-center justify-center">
        No jobs posted yet.
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-[100vh] bg-mine-shaft-950 text-white flex items-center justify-center">
        Job not found.
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] px-4">
      <div className="flex gap-5">
        <PostedJob job={job} jobList={jobList} />
        <PostedJobDesc {...job} />
      </div>
    </div>
  );
};

export default PostedJobPage;