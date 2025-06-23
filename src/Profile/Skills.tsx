import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconDeviceFloppy, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotoficationService";

const Skills = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state:any)=>state.profile);
  const [skills, setSkills] = useState<string[]>([])

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setSkills(profile.skills);
    }
    else setEdit(false);
  };

  const handleSave = ()=>{
    setEdit(false);
        let updatedprofile = { ...profile, skills:skills};
        dispatch(changeProfile(updatedprofile));
        successNotification("Success", "Skills Updated successfully");
  }
  return(
    <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          Skills{" "}
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
          <TagsInput
            placeholder="Add skill"
            value={skills}
            onChange={setSkills}
            splitChars={[",", " ", ", "]}
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile?.skills?.map((skill: any, index: number) => (
              <div
                key={index}
                className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>
  )
};
export default Skills