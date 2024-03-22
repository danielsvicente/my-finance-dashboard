import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import React, {useState, useEffect } from "react";
import axios from "axios";

export default function PieCardAccounts(props) {
  const { ...rest } = props;
  const [chartConfig, setData] = useState({});
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  let chart = {
      options: {
        labels: [],
        chart: {
          width: "50px",
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
        },
        legend: {
          show: true,
          position: 'bottom'
        },
        hover: { mode: null },
        plotOptions: {
          donut: {
            expandOnClick: false,
            donut: {
              labels: {
                show: false,
              },
            },
          },
        },
        tooltip: {
          enabled: true,
          theme: "dark",
        },
      }
    };

    const percentage = (total, fraction) => {
      if (total > 0) {
          return ((fraction * 100) / total).toFixed(2);
      }
      return 0
    } 
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const accounts = await axios.get(`${backendUrl}/accounts`);
          const total = await axios.get(`${backendUrl}/accounts/total`);
          chart.series = [];
          chart.fractions = [];
          accounts.data.map((acc) => {
            if (acc.currency === "BRL") {
              acc.balance = acc.balance / total.data.eur_brl_rate;
            }
            chart.series.push(acc.balance);
            chart.options.labels.push(acc.name);
          });
          chart.series.map((value) => {
            chart.fractions.push(percentage(total.data.balance, value));
          });
          setData(chart);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };

      fetchData();
    }, []);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card p='15px' align='center' direction='column' w='100%' {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='10px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          Money Distribution
        </Text>
      </Flex>

      { chartConfig?.series && (
          <PieChart
            h='100%'
            w='100%'
            chartData={chartConfig.series}
            chartOptions={chartConfig.options}
          />
      )}
    </Card>
  );
}
