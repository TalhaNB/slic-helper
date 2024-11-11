import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { configs } from "./firebase";
import { ClientType, RootObject } from "./types";
import { Grid2 as Grid, Typography } from "@mui/material";
import TeamAccordion from "./Components/TeamAccordion";
import { isNull } from "lodash";

const salesManagerPattern = /^salesManager\d+$/;
const salesRepresentativePattern = /^salesRepresentative\d+$/;
function App() {
  const [managerData, setManagerData] = useState<RootObject | null>(null);
  const clients = useMemo(() => {
    const clientArray: Array<ClientType> = [];
    if (!isNull(managerData)) {
      // Map direct clients
      managerData?.clients.forEach((client) => clientArray.push(client));

      // Map Sales Manager Clients
      Object.keys(managerData)
        .filter((key) => salesManagerPattern.test(key))
        .forEach((salesManager) => {
          if (managerData[salesManager].clients) {
            managerData[salesManager].clients.forEach((client) => clientArray.push(client));
          }
          if (managerData[salesManager].salesRepresentatives) {
            // Map Sales Representative Clients
            Object.keys(managerData[salesManager].salesRepresentatives)
              .filter((key) => salesRepresentativePattern.test(key))
              .forEach((salesRepresentative) => {
                managerData[salesManager].salesRepresentatives[salesRepresentative].clients.forEach(
                  (client: ClientType) => clientArray.push(client)
                );
              });
          }
        });
    }

    return clientArray;
  }, [managerData]);

  const fetchData = () => {
    const database = getDatabase(configs);
    const collectionRef = ref(database, process.env.COLLECTION_NAME);

    onValue(collectionRef, (snapshot) => {
      const dataItem = snapshot.val();
      if (dataItem) {
        setManagerData(dataItem["arif-qureshi-4575"]);
      }
    });
  };

  useEffect(() => {
    if (!managerData) {
      fetchData();
    }
  }, [managerData]);

  return (
    <Grid container justifyContent="center">
      <Typography variant="h5">Muhammad Arif Qureshi</Typography>
      <Typography variant="h6">Sales Dashboard</Typography>
      {managerData && (
        <Grid container size={12} justifyContent="flex-start">
          <Typography variant="caption" fontWeight={600}>
            Sales Managers
          </Typography>
          {Object.keys(managerData)
            .filter((key) => salesManagerPattern.test(key))
            .map((salesManager) => (
              <Grid size={12} key={salesManager} mt={1}>
                <TeamAccordion employeeData={managerData[salesManager]} />
              </Grid>
            ))}
        </Grid>
      )}
      {clients && (
        <Grid container size={12} justifyContent="flex-start">
          <Typography variant="caption" fontWeight={600}>
            Clients
          </Typography>
          {clients.map((client, index) => (
            <Grid size={12} key={`${client.firstName}-${index}-${client.lastName}-arif-qureshi-4575`} mt={1}>
              <TeamAccordion employeeData={client} />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
}

export default App;
