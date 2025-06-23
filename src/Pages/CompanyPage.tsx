import { Link, useNavigate } from "react-router-dom";
import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Company from "../CompanyProfile/Company";
import SimilarCompanies from "../CompanyProfile/SimilarCompanies";

const CompanyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Link className="my-5 inline-block" to="/find-talent">
        <Button
          onClick={() => navigate(-1)}
          leftSection={<IconArrowLeft size={20} />}
          color="bright-sun.4"
          my="md"
          variant="light"
        >
          Back
        </Button>
      </Link>
      <div className="flex gap-5 justify-between">
        <Company />
        <SimilarCompanies />
      </div>
    </div>
  );
};
export default CompanyPage;
