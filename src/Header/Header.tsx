import { ClassNames } from "@emotion/react";
import {
  IconAnchor,
  IconBell,
  IconSettings,
  IconX,
  IconXboxX,
} from "@tabler/icons-react";
import { Indicator, Avatar, Button, Burger, Drawer } from "@mantine/core";
import NavLinks from "./NavLinks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import NotificationMenu from "./NotificationMenu";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../Slices/UserSlice";
import { isEmail } from "@mantine/form";
import { setupResponseInterceptor } from "../Interceptor/AxiosInterceptor";
import { useDisclosure } from "@mantine/hooks";

const links = [
  { name: "Find Jobs", url: "find-jobs" },
  { name: "Find Talent", url: "find-talent" },
  { name: "Post Job", url: "post-job" },
  { name: "Posted Job", url: "posted-job" },
  { name: "Job History", url: "job-history" },
  { name: "SignUp", url: "signup" },
];

const Header = () => {
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const user = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.jwt);
  const location = useLocation();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     if (!user || user === null) return;

  //     try {
  //       const data = await getProfile(user.profileId);
  //       dispatch(setProfile(data));
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };

  //   fetchProfile();
  // }, [user, dispatch]);

  useEffect(() => {
    setupResponseInterceptor(navigate);
  }, [navigate]);

  useEffect(() => {
    if (!user) return; // added by me
    if (user === null) {
    } else {
      if (token != "") {
        const decoded = jwtDecode(token);
        dispatch(setUser({ ...decoded, email: decoded.sub }));
      }
      getProfile(user?.profileId)
        .then((data: any) => {
          dispatch(setProfile(data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, navigate]);
  return location.pathname != "/signup" && location.pathname != "/login" ? (
    <div className="w-full bg-mine-shaft-950 h-20 text-white flex justify-between px-6 items-center font-['poppins']">
      <div className="flex gap-3 items-center text-bright-sun-400 ">
        <IconAnchor className="h-8 w-8" stroke={2.5} />
        <div className="text-3xl font-semibold">Jobsy</div>
      </div>
      <NavLinks />
      <div className="flex gap-5 items-center">
        {/* <DarkMode /> */}
        {user ? (
          <ProfileMenu />
        ) : (
          <Link to="/login">
            <Button variant="subtle" color="bright-sun.4">
              Login
            </Button>
          </Link>
        )}
        {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator color="bright-sun.5" offset={6} size={8} processing>
            <IconBell stroke={1.5} />
          </Indicator>
        </div> */}
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <IconSettings stroke={1.5} />
        </div>
        {user ? <NotificationMenu /> : <></>}
        {}
        <Burger opened={opened} onClick={open} aria-label="Toggle-navigation" />
        <Drawer
          size="xs"
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          position="right"
          opened={opened}
          onClose={close}
          closeButtonProps={{ icon: <IconX size={30} /> }}
        >
          <div className="flex flex-col gap-5 items-center">
            {links.map((link, index) => (
              <div
                key={link.url}
                className={` ${
                  location.pathname == "/" + link.url
                    ? "border-bright-sun-400 text-bright-sun-400"
                    : "border-transparent"
                } border-t-[3px] h-full flex items-center`}
              >
                <Link key={index} to={`/${link.url}`}>
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Header;
