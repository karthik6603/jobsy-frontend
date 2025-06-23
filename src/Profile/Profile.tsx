import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  FileInput,
  Overlay,
  TagsInput,
  Textarea,
} from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconEdit,
  IconMapPin,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import Info from "./Info";
import { changeProfile, setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { successNotification } from "../Services/NotoficationService";
import { getBase64 } from "../Services/Utilities";

const Profile = (props: any) => {
  const dispatch = useDispatch();
  const select = fields;
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const [edit, setEdit] = useState([false, false, false, false, false]);
  const [about, setAbout] = useState(props.about);
  const [skills, setSkills] = useState(props.skills);
  const [addExp, setAddExp] = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const { hovered, ref } = useHover();
  const handleEdit = (index: any) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  };
  useEffect(() => {
    getProfile(user.id)
      .then((data: any) => {
        dispatch(setProfile(data));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  const handleFileChange = async (image: any) => {
    let picture: any = await getBase64(image);
    let updatedProfile = { ...profile, picture: picture.split(",")[1] };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile Picture updated Successfully");
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <div
          ref={ref}
          className="absolute flex items-center justify-center -bottom-1/3 left-3"
        >
          <Avatar
            className="!h-48 !w-48 rounded-full border-mine-shaft-950 border-8"
            src={
              profile.picture
                ? `data:image/jpeg;base64,${profile.picture}`
                : "/Avatar.png"
            }
            alt=""
          />

          {hovered && (
            <Overlay
              className="!rounded-full"
              color="#000"
              backgroundOpacity={0.75}
            />
          )}
          {hovered && <IconEdit className="absolute z-[300] !w-12 !h-12" />}
          {hovered && (
            <FileInput
              onChange={handleFileChange}
              className="absolute [&_*]:!rounded-full z-[301] [&_*]:!h-full !h-full w-full "
              accept="image/png, image/jpeg"
              variant="transparent"
            />
          )}
        </div>
      </div>
      <div className="px-3 mt-16 pt-10">
        <Info />
      </div>
      <Divider mx="xs" my="xl" />
      <About />
      <Divider mx="xs" my="xl" />
      <Skills />
      <Divider mx="xs" my="xl" />
      <Experience />
      <Divider mx="xs" my="xl" />
      <Certificate />
    </div>
  );
};
export default Profile;
