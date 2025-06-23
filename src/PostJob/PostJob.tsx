import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./RichTextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../Services/NotoficationService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PostJob = () => {
  const { id } = useParams();
  const [editorData, setEditorData] = useState(content);
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const select = fields;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id !== "0") {
      getJob(id)
        .then((res: any) => {
          form.setValues(res);
          setEditorData(res.description);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      form.reset();
      setEditorData(content);
    }
  }, [id]);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      jobTitle: "",
      company: "",
      experience: "",
      jobType: "",
      location: "",
      packageOffered: "",
      skillsRequired: [],
      about: "",
      description: content,
    },
    validate: {
      jobTitle: isNotEmpty("Title is Required"),
      company: isNotEmpty("Company is Required"),
      experience: isNotEmpty("Experience is Required"),
      jobType: isNotEmpty("JobType is Required"),
      location: isNotEmpty("Location is Required"),
      packageOffered: isNotEmpty("PackageOffered is Required"),
      skillsRequired: isNotEmpty("SkillsRequired is Required"),
      about: isNotEmpty("About is Required"),
      description: isNotEmpty("Description is Required"),
    },
  });

  const handlePost = () => {
    form.validate();
    if (!form.isValid()) return;
    postJob({ ...form.getValues(), postedBy: user.id, jobStatus: "ACTIVE" })
      .then((res) => {
        successNotification("Success", "Job Posted Successfully");
        navigate(`/posted-job/${res.id}`);
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Error", err.response.data.errorMessage);
      });
  };
  const handleDraft = () => {
    postJob({ ...form.getValues(), postedBy: user.id, jobStatus: "DRAFT" })
      .then((res) => {
        successNotification("Success", "Job Drafted Successfully");
        navigate(`/posted-job/${res.id}`);
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "Something went wrong",
          err.response.data.errorMessage
        );
      });
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="text-2xl font-semibold mb-5">Post a Job</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="jobTitle" {...select[0]} />
          <SelectInput form={form} name="company" {...select[1]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="experience" {...select[2]} />
          <SelectInput form={form} name="jobType" {...select[3]} />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput form={form} name="location" {...select[4]} />
          <NumberInput
            {...form.getInputProps("packageOffered")}
            label="Salary"
            withAsterisk
            min={1}
            max={300}
            clampBehavior="strict"
            placeholder="Enter Salary"
            hideControls
          />
        </div>
        <TagsInput
          {...form.getInputProps("skillsRequired")}
          acceptValueOnBlur
          withAsterisk
          splitChars={[",", " ", "|"]}
          label="Skills"
          placeholder="Enter skill"
        />
        <Textarea
          {...form.getInputProps("about")}
          withAsterisk
          className="my-3"
          label="About Job"
          autosize
          minRows={2}
          placeholder="Enter about Job"
        />
        <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20">
          <div className="text-sm font-medium">
            Job Description <span className="text-red-500">*</span>
          </div>
          <TextEditor form={form} />
        </div>
        <div className="flex gap-4">
          <Button onClick={handlePost} color="bright-sun.4" variant="light">
            Publish Job
          </Button>
          <Button color="bright-sun.4" onClick={handleDraft} variant="outline">
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PostJob;
