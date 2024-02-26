/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics"
import ColumnsTable from "views/admin/accounts/components/ColumnsTable";
import { tableColumnsData } from "views/admin/accounts/variables/columnsData";
import tableRowsData       from "views/admin/accounts/variables/rowsData.json";
import React, { useMemo, useState, useEffect} from "react";

export default function Settings() {

  

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid>
          <ColumnsTable
            columnsData={tableColumnsData}
            tableData={tableRowsData}
          />
      </SimpleGrid>
    </Box>
  );
}
