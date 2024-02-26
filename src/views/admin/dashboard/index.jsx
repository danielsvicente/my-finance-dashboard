import React, { useState, useEffect } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import TotalBalance from "views/admin/dashboard/components/TotalBalance";
import axios from "axios";
import PieCardAccounts from "./components/PieCardAccounts";
import PieCardTotal from "./components/PieCardTotal";


export default function Dashboard() {

    const [accounts, setAccounts] = useState([]);
    
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/accounts');
          setAccounts(response.data);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid gap='20px' mb='20px'>
                <SimpleGrid columns={{ base: 1, md: 4, xl: 7}} gap='20px' mb='20px'>
                        {accounts.map((acc) => (
                            <MiniStatistics 
                                growth={acc.variation.toFixed(2)}
                                name={acc.name} 
                                number={acc.balance}
                                currency={acc.currency}
                                precision={2} />
                        ))}
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
                    <TotalBalance />
                    <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
                        <PieCardAccounts />
                        <PieCardTotal />
                    </SimpleGrid>
                </SimpleGrid>
            </SimpleGrid>
        </Box>
    );
}