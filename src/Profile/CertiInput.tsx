import { Button, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../Services/NotoficationService";
import { changeProfile } from "../Slices/ProfileSlice";

const CertiInput = (props: any) => {
  const dispatch = useDispatch();
  const select = fields;
  const profile = useSelector((state: any) => state.profile);
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
      certificateId: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      issuer: isNotEmpty("Issuer is required"),
      issueDate: isNotEmpty("IssueDate is required"),
      certificateId: isNotEmpty("Certificate ID is required"),
    },
  });
  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;

    let certi = [...profile.certifications];
    const newCert = form.getValues();

    // Ensure issueDate is a valid Date before calling toISOString()
    const issueDate = new Date(newCert.issueDate);
    if (isNaN(issueDate.getTime())) {
      console.warn("Invalid issue date:", newCert.issueDate);
      return;
    }

    newCert.issueDate = issueDate;
    certi.push(newCert);

    const updatedProfile = { ...profile, certifications: certi };

    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));

    successNotification("Success", "Certifications updated successfully");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput
          {...form.getInputProps("name")}
          label="Title"
          withAsterisk
          placeholder="Enter Title"
        />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          label="Issue date"
          {...form.getInputProps("issueDate")}
          withAsterisk
          maxDate={new Date()}
          placeholder="Pick Date"
        />
        <TextInput
          label="Certificate ID"
          {...form.getInputProps("certificateId")}
          withAsterisk
          placeholder="Enter Certificate ID"
        />
      </div>
      <div className="flex gap-5">
        <Button color="green.8" onClick={handleSave} variant="light">
          Save
        </Button>
        <Button color="red.7" onClick={handleSave} variant="light">
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default CertiInput;
