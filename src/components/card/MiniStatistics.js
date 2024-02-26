import React from "react";
// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Icon,
  Text,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import CurrencyValue from "components/dataDisplay/CurrencyValue.js";
// Custom icons
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";


export default function Default(props) {
  const { startContent, endContent, name, growth, ...rest } = props;
  const textWhite = useColorModeValue("secondaryGray.900", "white");
  const textGrey = "secondaryGray.600";
  const textGreen = "green.500";
  const textRed = "red.500";

  let variationConfig = { 
    value: 0, 
    textColor: textGrey, 
    icon: RiArrowUpSFill
  };
  if (growth) {
    if (growth > 0) {
      variationConfig.value = growth;
      variationConfig.textColor = textGreen;
      variationConfig.icon = RiArrowUpSFill;
    } else if (growth < 0) {
      variationConfig.value = growth * (-1);
      variationConfig.textColor = textRed;
      variationConfig.icon = RiArrowDownSFill;
    } 
  }

  return (
    <Card py='15px'>
      <Flex
        my='auto'
        h='100%'
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}>
        {startContent}

        <Stat my='auto' ms={startContent ? "18px" : "0px"}>
          <StatLabel
            lineHeight='100%'
            color={textGrey}
            fontSize={{
              base: "sm",
            }}>
            {name}
          </StatLabel>
            <StatNumber
              color={textWhite}
              fontSize={{
              base: "2xl",
              }}>
                <CurrencyValue {...rest} /> 
            </StatNumber>
          {growth ? (
            <Flex align='center'>
              <Icon as={variationConfig.icon} color={variationConfig.textColor} mt='2px' />
              <Text color={variationConfig.textColor} fontSize='xs' fontWeight='700' me='5px'>{ `${variationConfig.value}%` }</Text>
              <Text color={textGrey} fontSize='xs' fontWeight='400'>since last month</Text>
            </Flex>
          ) : null}
        </Stat>
        <Flex ms='auto' w='max-content'>
          {endContent}
        </Flex>
      </Flex>
    </Card>
  );
}
