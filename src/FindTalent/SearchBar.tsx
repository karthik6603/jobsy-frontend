import { useState } from "react";
import { dropdownData } from "../Data/JobsData";
import { Divider, Input, RangeSlider } from "@mantine/core";
import { searchFields } from "../Data/TalentData";
import MultiInput from "../FindJobs/MultiInput";
import { IconUser, IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([1, 100]);
  const [name, setName] = useState("");
  const handleChange = (name: any, event: any) => {
    if (name == "exp") dispatch(updateFilter({ exp: event }));
    else {
      setName(event.target.value);
      dispatch(updateFilter({ name: event.target.value }));
    }
  };
  return (
    <div className="flex px-5 py-8 items-center !text-mine-shaft-100">
      <div className="flex items-center">
        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
          <IconUserCircle size={20} />
        </div>
        <Input
          className="[&_input]:!placeholder-mine-shaft-300"
          variant="unstyled"
          placeholder="Talent Name"
        />
      </div>
      {searchFields.map((item, index) => (
        <>
          <div key={index} className="w-1/5">
            <MultiInput key={index} {...item} />
          </div>
          <Divider mr="xs" size="xs" orientation="vertical" />
        </>
      ))}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex justify-between">
          <div>Experience</div>
          <div>
            &#8377;{value[0]}LPA - &#8377;{value[1]}LPA
          </div>
        </div>
        <RangeSlider
          color="bright-sun.4"
          size="xs"
          value={value}
          onChangeEnd={(e) => handleChange("exp", e)}
          minRange={1}
          min={0}
          max={50}
          step={1}
          defaultValue={[2, 10]}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
          onChange={setValue}
        />
      </div>
    </div>
  );
};
export default SearchBar;
