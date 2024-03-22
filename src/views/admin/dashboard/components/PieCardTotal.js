import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import { VSeparator } from "components/separator/Separator";
import React, {useState, useEffect } from "react";

import axios from "axios";

export default function PieCardTotal(props) {
  const { ...rest } = props;
  const [chartConfig, setData] = useState({});
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  let chart = {
      options: {
        labels: ["Invested", "Uninvested"],
        colors: ["#4318FF", "#6AD2FF"],
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
          show: false,
        },
        dataLabels: {
          enabled: false,
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
        fill: {
          colors: ["#4318FF", "#6AD2FF"],
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
    
    const fetchData = async () => {
        try {
          const response = await axios.get(`${backendUrl}/accounts/total`);
          const invested_percentage = percentage(response.data.balance, response.data.invested);
          const uninvested_percentage = percentage(response.data.balance, response.data.uninvested);
          chart.series = [response.data.invested, response.data.uninvested];
          chart.fractions = [invested_percentage, uninvested_percentage];
          setData(chart);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card p='15px' align='center' direction='column' w='100%' {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          Total per Type
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

      { chartConfig?.options && (
        <Card
          bg={cardColor}
          flexDirection='row'
          boxShadow={cardShadow}
          w='100%'
          p='15px'
          px='20px'
          mt='15px'
          mx='auto'>
          <Flex direction='column' py='5px'>
            <Flex align='center'>
              <Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
              <Text
                fontSize='xs'
                color='secondaryGray.600'
                fontWeight='700'
                mb='5px'>
                {chartConfig.options.labels[0]}
              </Text>
            </Flex>
            <Text fontSize='lg' color={textColor} fontWeight='700'>
              { chartConfig?.fractions && chartConfig?.fractions[0] }%
            </Text>
          </Flex>
          <VSeparator mx={{ base: "60px", xl: "60px", "2xl": "60px" }} />
          <Flex direction='column' py='5px' me='10px'>
            <Flex align='center'>
              <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
              <Text
                fontSize='xs'
                color='secondaryGray.600'
                fontWeight='700'
                mb='5px'>
                {chartConfig.options.labels[1]}
              </Text>
            </Flex>
            <Text fontSize='lg' color={textColor} fontWeight='700'>
              { chartConfig?.fractions && chartConfig?.fractions[1] }%
            </Text>
          </Flex>
        </Card>
      )}
    </Card>
  );
}
