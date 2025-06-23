import { useState } from "react";
import { dropdownData } from "../Data/JobsData";
import { MultiInput } from "./MultiInput";
import { Divider, RangeSlider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([1, 100]);
  const handleChange = (event: any) => {
    dispatch(updateFilter({ salary: event }));
  };
  return (
    <div className="flex px-5 py-8">
      {dropdownData.map((item, index) => (
        <div key={index} className="w-1/5">
          <div className="">
            <MultiInput {...item} />
          </div>
          <Divider mr="xs" size="xs" orientation="vertical" />
        </div>
      ))}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex justify-between">
          <div>Salary</div>
          <div>
            &#8377;{value[0]}LPA - &#8377;{value[1]}LPA
          </div>
        </div>
        <RangeSlider
          color="bright-sun.4"
          size="xs"
          value={value}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
          onChange={setValue}
          onChangeEnd={handleChange}
          minRange={1}
          min={1}
          max={300}
          step={1}
          defaultValue={[10, 30]}
        />
      </div>
    </div>
  );
};
export default SearchBar;
