import { useState } from "react";
import { Button, Combobox, useCombobox, Text, Box } from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateSort } from "../Slices/SortSlice";

const opt = [
  "relevance",
  "most recent",
  "salary (low-high)",
  "salary (high-low)",
];
const talentSort = [
  "relevance",
  "experience: low to high",
  "experience: high to low",
];

const Sort = (props: any) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<string | null>(`Relevance`);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options =
    props.sort == "job"
      ? opt.map((item) => (
          <Combobox.Option value={item} key={item}>
            {item}
          </Combobox.Option>
        ))
      : talentSort.map((item) => (
          <Combobox.Option value={item} key={item}>
            {item}
          </Combobox.Option>
        ));

  return (
    <>
      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
        withArrow
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          dispatch(updateSort(val));
          combobox.closeDropdown();
        }}
        classNames={{ option: "capitalize" }}
      >
        <Combobox.Target>
          <div
            onClick={() => combobox.toggleDropdown()}
            className="cursor-pointer text-sm gap-2 border border-bright-sun-400 flex px-2 py-1 rounded-xl items-center"
          >
            {selectedItem}{" "}
            <IconAdjustments className="h-5 w-5 text-bright-sun-400" />
          </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};
export default Sort;
