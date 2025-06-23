import { ActionIcon } from "@mantine/core";
import {
  IconBriefcase,
  IconCheck,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotoficationService";

const Info = () => {
  const select = fields;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState(false);

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
      });
    } else setEdit(false);
  };

  const form = useForm({
    mode: "controlled",
    initialValues: { jobTitle: "", company: "", location: "" },
  });

  const handleSave = () => {
    setEdit(false);
    let updatedprofile = { ...profile, ...form.getValues() };
    dispatch(changeProfile(updatedprofile));
    successNotification("Success", "Profile Updated successfully");
  };

  return (
    <>
      <div className="text-3xl font-semibold flex justify-between">
        {user.name}
        <div>
          {edit && (
            <ActionIcon
              onClick={handleSave}
              size="lg"
              color="green.8"
              variant="subtle"
            >
              <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
          <ActionIcon
            onClick={handleClick}
            size="lg"
            color={edit ? "red.8" : "bright-sun.4"}
            variant="subtle"
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
      </div>
      {edit ? (
        <>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="location" {...select[2]} />
          </div>
        </>
      ) : (
        <>
          <div className="text-xl flex gap-1 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />
            {profile.jobTitle} &bull; {profile.company}
          </div>
          <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
            <IconMapPin className="h-5 w-5" stroke={1.5} />
            {profile.location}
          </div>
        </>
      )}
    </>
  );
};

export default Info;
