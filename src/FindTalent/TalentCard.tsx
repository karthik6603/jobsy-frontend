import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Avatar, Divider, Text, Button, Modal, Tooltip } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, PickerControl, TimeInput } from "@mantine/dates";
import { useEffect, useRef, useState } from "react";
import { changeAppStatus } from "../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../Services/NotoficationService";
import { getProfile } from "../Services/ProfileService";
import { formatInterviewTime, openBase64PDF } from "../Services/Utilities";

const TalentCard = (props: any) => {
  const { id } = useParams();
  const ref = useRef<HTMLInputElement>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  useEffect(() => {
    if (props.applicantId)
      getProfile(props.applicantId)
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });
    else setProfile(props);
  }, [props]);
  const handleOffer = (status: string) => {
    let interview: any = {
      id,
      applicantId: profile?.id,
      applicationStatus: status,
    };
    if (status == "INTERVIEWING") {
      const [hours, minutes] = time.split(":").map(Number);
      date?.setHours(hours, minutes);
      interview = { ...interview, interviewTime: date };
    }
    changeAppStatus(interview)
      .then((res) => {
        if (status == "INTERVIEWING")
          successNotification(
            "Interview Scheduled",
            "Interview scheduled successfully 👍"
          );
        else if (status == "OFFERED")
          successNotification("Offered", "offer sent successfully 👏");
        else successNotification("Rejected", "Application Rejected 🙏");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Error", err.response.data.errorMessage);
      });
  };

  return (
    <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar
              size="lg"
              src={
                profile?.picture
                  ? `data:image/jpeg;base64,${profile?.picture}`
                  : null
              }
              alt="microsoft"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm text-mine-shaft-300">
              {profile?.jobTitle} &middot; {profile?.company}
            </div>
          </div>
        </div>
        <IconHeart className="text-mine-shaft-300 cursor-pointer" />
      </div>
      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        {profile.skills?.map((skill: any, index: any) => (
          <div key={index}>{skill}</div>
        ))}
      </div>
      <Text
        className="!text-xs !text-justify !text-mine-shaft-300"
        lineClamp={2}
      >
        {profile.about}
      </Text>
      <Divider size="xs" color="mine-shaft.7" />
      {props.invited ? (
        <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendarMonth stroke={1.5} />
          Interview : {formatInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-200">
            Exp: {props.totalExp ? props.totalExp : 1}{" "}
            {props.totalExp > 1 ? "Years" : "Year"}
          </div>
          <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
            <IconMapPin className="h-5 w-5" stroke={1.5} />
            {profile.location}
          </div>
        </div>
      )}

      <Divider size="xs" color="mine-shaft.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited ? (
          <>
            <Link to={`/talent-profile/${profile?.id}</>`}>
              <Button color="bright-sun.4" variant="outline" fullWidth>
                Profile
              </Button>
            </Link>

            <div>
              {props.posted ? (
                <Tooltip label="Schedule Interview">
                  <Button
                    onClick={open}
                    rightSection={<IconCalendarMonth className="w-5 h-5 " />}
                    color="bright-sun.4"
                    variant="light"
                    fullWidth
                  >
                    Schedule Interview
                  </Button>
                </Tooltip>
              ) : (
                <Button color="bright-sun.4" variant="light" fullWidth>
                  Message
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-3 [&>*]:w-1/2">
              <Button
                className=""
                onClick={() => handleOffer("OFFERED")}
                color="bright-sun.4"
                variant="outline"
                fullWidth
              >
                Accept
              </Button>
            </div>
            <div>
              <Button
                className=""
                onClick={() => handleOffer("REJECTED")}
                color="bright-sun.4"
                variant="light"
                fullWidth
              >
                Reject
              </Button>
            </div>
          </>
        )}
      </div>

      <div>
        {(props.invited || props.posted) && (
          <Button onClick={openApp} variant="filled" fullWidth>
            View Application
          </Button>
        )}
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Schedule Interview"
        centered
      >
        <div className="flex flex-col gap-4">
          <DateInput
            value={date}
            minDate={new Date()}
            onChange={setDate}
            label="Date"
            placeholder="Enter Date"
          />
          <TimeInput
            label="Time"
            ref={ref}
            onChange={(event) => setTime(event.currentTarget.value)}
            onClick={() => ref.current?.showPicker()}
          />
          <Button
            onClick={() => handleOffer("INTERVIEWING")}
            color="bright-sun.4"
            variant="light"
            fullWidth
          >
            Schedule
          </Button>
        </div>
      </Modal>

      <Modal opened={app} onClose={closeApp} title="Application" centered>
        <div className="flex flex-col gap-4">
          <div>
            Email: &emsp;{" "}
            <a
              className="hover:underline cursor-pointer text-center"
              href={`mailto:${props.email}`}
            >
              {props.email}{" "}
            </a>
          </div>
          <div>
            Website: &emsp;{" "}
            <a
              target="_blank"
              className="hover:underline cursor-pointer text-center"
              href={props.website}
            >
              {props.website}{" "}
            </a>
          </div>
          <div>
            Resume: &emsp;{" "}
            <span
              className="hover:underline cursor-pointer text-center"
              onClick={() => openBase64PDF(props.resume)}
            >
              {props.name}{" "}
            </span>
          </div>
          <div>
            Cover Letter: &emsp; <div>{props.coverLetter} </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default TalentCard;
