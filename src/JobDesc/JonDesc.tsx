import { Button, Divider } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import {
  IconAdjustments,
  IconBookmark,
  IconBookmarkFilled,
  IconMapPin,
} from "@tabler/icons-react";
import { Link, useFetcher, useSearchParams } from "react-router-dom";
import { card } from "../Data/JobDescData";
//@ts-ignore
import DOMPurify from "dompurify";
import { timeAgo } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob } from "../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../Services/NotoficationService";

const JobDesc = (props: any) => {
  const dispatch = useDispatch();
  const [applied, setApplied] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const data = DOMPurify.sanitize(props.description);
  const handleSaveJob = () => {
    let savedJobs = Array.isArray(profile.savedJobs)
      ? [...profile.savedJobs]
      : [];
    if (savedJobs?.includes(props.id)) {
      savedJobs = savedJobs?.filter((id: any) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
    }
    let updatedProfile = { ...profile, savedJobs: savedJobs };
    dispatch(changeProfile(updatedProfile));
  };
  useEffect(() => {
    if (
      props.applicants?.filter(
        (applicant: any) => applicant.applicantId == user.id
      ).length > 0
    ) {
      setApplied(true);
    } else setApplied(false);
  }, [props]);
  const handleClose = () => {
    postJob({ ...props, jobStatus: "CLOSED" })
      .then((res) => {
        successNotification("Closed", "Job closed Successfully");
      })
      .catch((err) => {
        errorNotification("Error", err.response.data.errorMessage);
      });
  };
  return (
    <div className="w-3/4">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img
              className="h-14 "
              src={`/Icons/${props.company}.png`}
              alt={props.company}
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
        <div className="flex flex-col gap-2 items-center">
          {props.edit ||
            (!applied && (
              <Link to={`/apply-job/${props.id}`}>
                <Button color="bright-sun.4" size="sm" variant="light">
                  {props.closed ? "Reopen" : props.edit ? "Edit" : "Apply"}
                </Button>
              </Link>
            ))}
          {!props.edit && applied && (
            <Button color="green.8" size="sm" variant="light">
              Applied
            </Button>
          )}
          {props.edit && !props.closed ? (
            <Button color="red.5" size="sm" variant="outline">
              Delete
            </Button>
          ) : profile.savedJobs?.includes(props.id) ? (
            <IconBookmarkFilled
              onClick={handleSaveJob}
              className="text-bright-sun-400 cursor-pointer"
            />
          ) : (
            <IconBookmark
              onClick={handleSaveJob}
              className="text-mine-shaft-300 hover:text-bright-sun-400 cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="flex justify-between mt-5">
        {card.map((item: any, index: any) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <ActionIcon
              color="bright-sun.4"
              className="!h-12 !w-12"
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-mine-shaft-300 text-sm">{item.name}</div>
            <div className="font-semibold ">
              {props ? props[item.id] : "NA"}
              {item.id == "packageOffered" && <>LPA</>}
            </div>
          </div>
        ))}
      </div>

      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(props?.skillsRequired) &&
          props.skillsRequired.length > 0 ? (
            props.skillsRequired.map((skill: any, index: number) => (
              <ActionIcon
                key={index}
                color="bright-sun.4"
                className="!h-fit !w-fit !font2-medium !text-sm"
                variant="light"
                p="xs"
                radius="xl"
                aria-label="Skill"
              >
                {skill}
              </ActionIcon>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <Divider my="xl" />
      <div
        className="[&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 [&_h4]:text-mine-shaft-200 [&_p]:text-justify "
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
      <Divider my="xl" />
      <div>
        <div className="text-xl font-semibold mb-5">About Company</div>
        <div className="flex justify-between mb-3">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img
                className="h-8 "
                src={`/Icons/${props.company}.png`}
                alt="microsoft"
              />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold text-lg">{props.company}</div>
              <div className=" text-mine-shaft-300">10k+ Employees</div>
            </div>
          </div>
          <Link to={`/company/${props.comapany}`}>
            <Button color="bright-sun.4" size="sm" variant="light">
              Company Page
            </Button>
          </Link>
        </div>
        <div className="text-mine-shaft-300 text-justify">
          We are a leading organization committed to delivering innovative
          solutions and exceptional service across a wide range of industries.
          Our mission is to drive business transformation through technology,
          collaboration, and customer-centric strategies. With a focus on
          excellence and integrity, we strive to create meaningful impact and
          long-term value for our clients, partners, and communities.
        </div>
      </div>
    </div>
  );
};
export default JobDesc;
