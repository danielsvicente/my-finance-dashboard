import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import TreemapChart from "components/charts/TreemapChart";
import React, {useState, useEffect } from "react";
import axios from "axios";

export default function TreemapCardAccounts(props) {
  const { ...rest } = props;
  const [chartConfig, setData] = useState({});
  let chart = {
    series: [
      {
        data: []
      }
    ],
    options: {
      legend: {
        show: false
      },
      chart: {
        height: 350,
        type: 'treemap'
      }
    },
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
        const accounts = await axios.get('http://localhost:8000/accounts');
        const total = await axios.get('http://localhost:8000/accounts/total');
        accounts.data.map((acc) => {
          // if (acc.currency === "BRL") {
          //   acc.balance = acc.balance / total.data.eur_brl_rate;
          // }
          chart.series[0].data.push({ x: acc.name, y: acc.balance });
        });
        setData(chart);
        console.log(chart);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

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
        mb='10px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          Money Distribution
        </Text>
      </Flex>

      { chartConfig?.series && (
          <TreemapChart
            h='100%'
            w='100%'
            chartData={chartConfig.series}
            chartOptions={chartConfig.options}
          />
      )}
      {/* <Card
        bg={cardColor}
        flexDirection='row'
        boxShadow={cardShadow}
        w='100%'
        p='15px'
        px='20px'
        mt='15px'
        mx='auto'>
          {componentData?.chart.labels && componentData.chart.labels.map((label) => 
            <Flex direction='column' py='5px' me='15px' >
              <Flex align='center'>
                <Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
                <Text
                  fontSize='xs'
                  color='secondaryGray.600'
                  fontWeight='700'
                  mb='5px'>
                  {label}
                </Text>
              </Flex>
              <Text fontSize='lg' color={textColor} fontWeight='700'>
                0%
              </Text>
            </Flex>
          )}
      </Card> */}
    </Card>
  );
}
