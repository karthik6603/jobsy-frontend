import { Divider } from "@mantine/core";
import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../Services/Utilities";

const ApplyJobComp = (props: any) => {
  return (
    <div className="w-2/3 mx-auto">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img
              className="h-14 "
              src={`/Icons/${props.company}.png`}
              alt="microsoft"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-2xl">{props.jobTitle}</div>
            <div className="text-lg text-mine-shaft-300">
              {props.company} &middot; {timeAgo(props.postTime)} &middot;{" "}
              {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>
      </div>
      <Divider size="xs" my="xl" />
      <ApplicationForm />
    </div>
  );
};
export default ApplyJobComp;
