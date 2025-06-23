import { Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { useEffect, useState } from "react";
import { MonthPicker, MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import Experience from "./Experience";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotoficationService";

const ExpInput = (props: any) => {
  const dispatch = useDispatch();
  const select = fields;
  const profile = useSelector((state: any) => state.profile);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      working: false,
    },
    validate: {
      title: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("location is required"),
      description: isNotEmpty("Description is required"),
    },
  });

  useEffect(() => {
    if (!props.add)
      form.setValues({
        title: props.title || "",
      company: props.company || "",
      location: props.location || "",
      description: props.description || "",
      startDate:
        props.startDate && !isNaN(new Date(props.startDate).getTime())
          ? new Date(props.startDate)
          : new Date(),
      endDate:
        props.endDate && !isNaN(new Date(props.endDate).getTime())
          ? new Date(props.endDate)
          : new Date(),
      working: props.working || false,
      });
  }, []);

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;
    let exp = [...profile.experience];
    if (props.add) {
      exp.push(form.getValues());
      exp[exp.length - 1].startDate =
        exp[exp.length - 1].startDate.toISOString();
      exp[exp.length - 1].endDate = exp[exp.length - 1].endDate.toISOString();
    } else {
      exp[props.index] = form.getValues();
      exp[props.index].startDate = exp[props.index].startDate.toISOString();
      exp[props.index].endDate = exp[props.index].endDate.toISOString();
    }
    let updatedProfile = { ...profile, experience: exp };
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    successNotification(
      "Success",
      `Experience ${props.add ? "Added" : "Updated"}  successfully`
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">
        {props.add ? "Add" : "Edit"} experience
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>
      <SelectInput form={form} name="location" {...select[2]} />
      <Textarea
        {...form.getInputProps("description")}
        autosize
        withAsterisk
        label="Job summary"
        minRows={3}
        placeholder="Enter Summary..."
      />

      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          label="Start date"
          withAsterisk
          value={form.values.startDate}
          onChange={(value) =>
            form.setFieldValue("startDate", value ?? new Date())
          }
          maxDate={
            form.values.endDate instanceof Date &&
            !isNaN(form.values.endDate.getTime())
              ? form.values.endDate
              : undefined
          }
          placeholder="Pick Date"
          valueFormat="MMMM YYYY"
        />

        <MonthPickerInput
          label="End date"
          withAsterisk
          value={form.values.endDate}
          onChange={(value) =>
            form.setFieldValue("endDate", value ?? new Date())
          }
          disabled={form.values.working}
          minDate={
            form.values.startDate instanceof Date &&
            !isNaN(form.values.startDate.getTime())
              ? form.values.startDate
              : undefined
          }
          maxDate={new Date()}
          placeholder="Pick Date"
          valueFormat="MMMM YYYY"
        />
      </div>
      <Checkbox
        checked={form.getValues().working}
        onChange={(event) =>
          form.setFieldValue("working", event.currentTarget.checked)
        }
        
        label="currently i'm working here"
      />
      <div className="flex gap-5">
        <Button color="bright-sun.4" onClick={handleSave}>
          Save
        </Button>
        <Button
          color="red.7"
          onClick={() => props.setEdit(false)}
          variant="light"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default ExpInput;
