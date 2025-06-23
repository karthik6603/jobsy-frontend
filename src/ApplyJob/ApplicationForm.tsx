import {
  Button,
  FileInput,
  LoadingOverlay,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { getBase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  errorNotification,
  successNotification,
} from "../Services/NotoficationService";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const handlePreview = () => {
    form.validate();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!form.isValid()) return;
    setPreview(!preview);
  };
  const handleSubmit = async () => {
    setSubmit(true);
    let resume: any = await getBase64(form.getValues().resume);
    let applicant = {
      ...form.getValues(),
      applicantId: user.id,
      resume: resume.split(",")[1],
    };
    applyJob(id, applicant)
      .then((res) => {
        setSubmit(false);
        successNotification("Success", "Application submitted successfully");
        navigate("/job-history");
      })
      .catch((err) => {
        setSubmit(false);
        errorNotification("Error", err.response.data.errorMessage);
      });
  };
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      resume: null,
      coverLetter: "",
    },
    validate: {
      name: isNotEmpty("Name cannot be empty"),
      email: isNotEmpty("Email cannot be empty"),
      phone: isNotEmpty("phone number cannot be empty"),
      website: isNotEmpty("website is required"),
      resume: isNotEmpty("Resume is needed for the job"),
      coverLetter: isNotEmpty("CoverLetter is needed"),
    },
  });
  return (
    <div>
      <LoadingOverlay
        className="!fixed"
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "bright-sun.4", type: "bars" }}
      />
      <div className="text-xl font-semibold mb-5">Submit your Application</div>
      <div className="flex flex-col gap-5 ">
        <div className="flex gap-10 [&>*]:w-1/2">
          <TextInput
            {...form.getInputProps("name")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Full Name"
            withAsterisk
            placeholder="John Doe"
          />
          <TextInput
            {...form.getInputProps("email")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Email"
            withAsterisk
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <NumberInput
            {...form.getInputProps("phone")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Phone Number"
            withAsterisk
            hideControls
            min={0}
            max={9999999999}
            clampBehavior="strict"
            placeholder="9876543210"
          />
          <TextInput
            {...form.getInputProps("website")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Personal Portfolio"
            withAsterisk
            placeholder="www.example.com"
          />
        </div>
        <FileInput
          {...form.getInputProps("resume")}
          readOnly={preview}
          accept="application/pdf"
          variant={preview ? "unstyled" : "default"}
          className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
          leftSection={<IconPaperclip stroke={1.5} />}
          withAsterisk
          label="Attach your CV"
          placeholder="Olny pdf and docx are accepted"
          leftSectionPointerEvents="none"
        />
        <Textarea
          {...form.getInputProps("coverLetter")}
          readOnly={preview}
          variant={preview ? "unstyled" : "default"}
          className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
          placeholder="Describe yourself to the Hiring Manager..."
          withAsterisk
          label="Cover Letter"
          autosize
          minRows={4}
        />
        {!preview && (
          <Button onClick={handlePreview} color="bright-sun.4" variant="light">
            Preview
          </Button>
        )}
        {preview && (
          <div className="flex gap-10 [&>*]:w-1/2">
            <Button
              fullWidth
              onClick={handlePreview}
              color="bright-sun.4"
              variant="outline"
            >
              Edit
            </Button>
            <Button
              fullWidth
              onClick={handleSubmit}
              color="bright-sun.4"
              variant="light"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ApplicationForm;
