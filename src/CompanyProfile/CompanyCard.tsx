import { ActionIcon, Button } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

const CompanyCard = (props: any) => {
  return (
    <div className="flex justify-between bg-mine-shaft-900 items-center rounded-lg p-4">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-800 rounded-md">
          <img
            className="h-7"
            src={`/Icons/${props.name}.png`}
            alt="microsoft"
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-lg">{props.name}</div>
          <div className="text-xs text-mine-shaft-300 font-semibold">
            {props.company} &midddot; {props.employees} Employees
          </div>
        </div>
      </div>
      <Button
        color="bright-sun.4"
        variant="subtle"
        aria-label="settings"
        rightSection={
          <IconExternalLink
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        }
      ></Button>
    </div>
  );
};
export default CompanyCard;
