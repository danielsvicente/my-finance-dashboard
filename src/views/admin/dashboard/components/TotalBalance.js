// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import LineChart from "components/charts/LineChart";
import CurrencyValue from "components/dataDisplay/CurrencyValue";
import React, {useState, useEffect} from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import axios from "axios";


export default function TotalBalance(props) {
  const { ...rest } = props;
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [data, setData] = useState({
    balance: {
      current: 0.00,
      variation: 0.00
    }
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/accounts/total/history/`);

        if (response.data.length > 0) {
          const currentBalance = response.data[response.data.length - 1].balance;
          const variation = response.data[response.data.length - 1].variation;

          if (response.data.length == 1) {
            setData({
              balance: {
                current: currentBalance,
                variation: variation
              }
            });
          } else {
            setData({
              balance: {
                current: currentBalance,
                variation: variation
              },
              chart: {
                options: {
                  chart: {
                    toolbar: {
                      show: false,
                    }
                  },
                  tooltip: {
                    theme: "dark",
                  },
                  stroke: {
                    width: 4,
                    curve: "smooth"
                  },
                  colors: ["#5DFFB7"],
                  fill: {
                    type:'solid',
                    opacity: 0.1,
                  },
                  xaxis: {
                    categories: response.data.map(element => element?.date.substring(0, 7)),
                    labels: {
                      style: {
                        colors: "#A3AED0",
                        fontSize: "10px",
                        fontWeight: "400",
                      },
                    },
                    axisBorder: {
                      show: false,
                    },
                    axisTicks: {
                      show: false,
                    },
                  },
                  yaxis: {
                    show: false,
                  },
                  legend: {
                    show: false,
                  },
                  grid: {
                    show: false
                  }
                },
                series: [
                  {
                    name: "balance-history",
                    type: "area",
                    data: response.data.map(element => element?.balance)
                  }
                ]
              }
            });
          }
        } 
        
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    
    fetchData();
  }, []);
  
  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%'>
          <Text
            me='auto'
            color={textColor}
            fontSize='xl'
            fontWeight='700'
            lineHeight='100%'>
            Total Balance
          </Text>
        </Flex>
      </Flex>
      { data && data?.balance && (
        <Flex w='100%' flexDirection={{ base: "column", lg: "column" }} >
            <Flex flexDirection='row' me='20px' mt='28px'>
              <CurrencyValue 
                color={textColor}
                fontSize='34px'
                textAlign='start'
                fontWeight='700'
                lineHeight='100%'
                number={data.balance.current}
                precision={2}
                currency="EUR" />

                <Flex align='end'>
                  <Icon as={RiArrowUpSFill} color='green.500' me='2px' mt='2px' />
                  <Text color='green.500' fontSize='sm' fontWeight='700' me='10px' mt='2px'>
                    {data.balance.variation.toFixed(2)}%
                  </Text>
                  <Text color='secondaryGray.600' fontSize='xs' fontWeight='400' >
                    since last month
                  </Text>
                </Flex>
            </Flex>

            { data?.chart && (
              <Box minH='260px' minW='75%' mt='auto'>
                <LineChart
                  chartData={data.chart.series}
                  chartOptions={data.chart.options}
                />
              </Box>
            )}
            
        </Flex>
      )}
    </Card>
  );
}
