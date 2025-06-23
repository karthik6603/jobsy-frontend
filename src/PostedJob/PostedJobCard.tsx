import { Link, useParams } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";

const PostedJobCard = (props: any) => {
  const { id } = useParams();
  return (
    <Link
      to={`/posted-jobs/${props.id}`}
      className="bg-mine-shaft-900 rounded-xl p-2 border-l-2 border-l-bright-sun-400"
    >
      <div className="text-sm font-semibold">{props.jobTitle}</div>
      <div className="text-xs text-mine-shaft-300 font-medium">
        {props.location}
      </div>
      <div className="text-xs text-mine-shaft-300">
        {props.jobStatus == "DRAFT"
          ? "Drafted"
          : props.jobStatus == "CLOSED"
          ? "Closed"
          : "Posted"}{" "}
        {timeAgo(props.postTime)}
      </div>
    </Link>
  );
};
export default PostedJobCard;
