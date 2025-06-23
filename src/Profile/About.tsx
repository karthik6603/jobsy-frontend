import { ActionIcon, Textarea } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { IconCheck, IconDeviceFloppy, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotoficationService";

const About = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state:any)=>state.profile);
  const [about, setAbout] = useState("")

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setAbout(profile.about);
    }
    else setEdit(false);
  };

  const handleSave = ()=>{
    setEdit(false);
        let updatedprofile = { ...profile, about:about};
        dispatch(changeProfile(updatedprofile));
        successNotification("Success", "About Updated successfully");
  }

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About{" "}
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
        </div>{" "}
      </div>
      {edit ? (
        <Textarea
          value={about}
          autosize
          minRows={3}
          placeholder="Enter about yoursel..."
          onChange={(event) => setAbout(event.currentTarget.value)}
        />
      ) : (
        <div className="text-sm text-mine-shaft-300 text-justify">
          {profile?.about}
        </div>
      )}
    </div>
  );
};
export default About;
