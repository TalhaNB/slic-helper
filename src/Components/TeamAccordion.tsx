import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ClientType, SalesManagerType, SalesRepType } from "../types";
import { Grid2, Typography } from "@mui/material";

type TeamAccordionProps = {
  employeeData: SalesManagerType | SalesRepType | ClientType;
};
const salesRepresentativePattern = /^salesRepresentative\d+$/;
const TeamAccordion: React.FC<TeamAccordionProps> = ({ employeeData }) => {
  const salesReps = "salesRepresentatives" in employeeData ? employeeData.salesRepresentatives : null;
  const clients = "clients" in employeeData ? employeeData.clients : null;

  return (
    <Grid2 size={12} mb={1}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          {`${employeeData.code ? employeeData.code + " | " : ""}${employeeData.firstName} ${employeeData.lastName}`}
        </AccordionSummary>
        <AccordionDetails>
          {salesReps && (
            <Grid2 container size={12} justifyContent="flex-start" mt={1}>
              <Typography variant="caption" fontWeight={600}>
                Sales Representatives
              </Typography>
              {Object.keys(salesReps)
                .filter((key) => salesRepresentativePattern.test(key))
                .map((salesRepresentative) => (
                  <TeamAccordion key={salesRepresentative} employeeData={salesReps[salesRepresentative]} />
                ))}
            </Grid2>
          )}
          {clients && (
            <Grid2 container size={12} justifyContent="flex-start" mt={1}>
              <Typography variant="caption" fontWeight={600}>
                Clients
              </Typography>
              {clients.map((client, index) => (
                <TeamAccordion key={`${client.firstName}-${index}-${client.lastName}`} employeeData={client} />
              ))}
            </Grid2>
          )}
        </AccordionDetails>
      </Accordion>
    </Grid2>
  );
};

export default TeamAccordion;
