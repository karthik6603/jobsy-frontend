import { Tabs } from "@mantine/core";
import { activeJobs } from "../Data/PostedJob";
import PostedJobCard from "./PostedJobCard";
import { useEffect, useState } from "react";

const PostedJob = (props: any) => {
  const [activeTab, setActiveTab] = useState<string | null>("ACTIVE");
  useEffect(() => {
    setActiveTab(props.job?.jobStatus || "ACTIVE");
    // console.log(activeTab)
  }, [props.job]);
  return (
    <div className="w-1/6 mt-5">
      <div className="text-2xl font-semibold mb-5 ">Jobs</div>
      <div>
        <Tabs
          variant="pills"
          radius="md"
          value={activeTab}
          onChange={setActiveTab}
        >
          <Tabs.List className="[&_button[aria-selected]='false']:bg-mine-shaft-900 font-medium">
            <Tabs.Tab value="ACTIVE">
              Active [
              {
                props.jobList?.filter((job: any) => job?.jobStatus == "ACTIVE")
                  .length
              }
              ]
            </Tabs.Tab>
            <Tabs.Tab value="DRAFT">
              Draft (
              {
                props.jobList?.filter((job: any) => job?.jobStatus == "DRAFT")
                  .length
              }
              ){" "}
            </Tabs.Tab>
            <Tabs.Tab value="CLOSED">
              Closed (
              {
                props.jobList?.filter((job: any) => job?.jobStatus == "CLOSED")
                  .length
              }
              ){" "}
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <div className="flex flex-col gap-5 mt-3">
          {props.jobList
            ?.filter((job: any) => job?.jobStatus == activeTab)
            .map((item: any, idx: any) => (
              <PostedJobCard key={idx} {...item} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default PostedJob;
