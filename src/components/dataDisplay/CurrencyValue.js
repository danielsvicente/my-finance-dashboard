import { Text } from "@chakra-ui/react";

export default function CurrencyValue(props) {
    const { number, precision, currency, ...rest } = props;

    let symbol = "";
    switch (currency) {
        case "BRL":
            symbol = "R$";
            break;
        case "EUR":
            symbol = "€";
            break;
        case "GBP":
            symbol = "£";
            break;
        case "USD":
            symbol = "$";
            break;
        default:
            symbol = "";
            break;
    }
    const formattedNumber = `${symbol}${number.toFixed(precision).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

    return (
        <Text {...rest}>
            {formattedNumber}
        </Text>
    )
}