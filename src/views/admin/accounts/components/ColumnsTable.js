import {
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo, useState, useEffect} from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import axios from 'axios';
import Card from "components/card/Card";
import AccountFormModal from "./AccountFormModal";
import NoteFormModal from "./NoteFormModal";
import { ChatIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";


export default function ColumnsTable(props) {
  const { columnsData, tableData } = props;
  const [accounts, setAccounts] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  const currencyFormat = (num) => {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/accounts`);
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => accounts, [accounts]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 10;

  const deleteAccount = async (accountId) => {
    console.log(`Deleting account ${accountId}`);
    try {
      await axios.delete(`${backendUrl}/accounts/${accountId}`);
      const updatedAccounts = accounts.filter(account => account.id !== accountId);
      console.log(updatedAccounts);
      setAccounts(updatedAccounts);
    } catch (error) {
      console.error('There was an error deleting the account:', error);
    }
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showAccountFormModal, setShowAccountFormModal] = useState(false);
  const [showNoteFormModal, setShowNoteFormModal] = useState(false);

  // Function to open the modal
  const openAccountFormModal = (acc) => {
    setSelectedAccount(acc);
    setShowAccountFormModal(true);
  };
  const openNoteFormModal = (acc) => {
    setSelectedAccount(acc);
    setShowNoteFormModal(true);
  };

  // Function to close the modal
  const closeAccountFormModal = () => {
    fetchData();
    setShowAccountFormModal(false);
  };
  const closeNoteFormModal = () => {
    setShowNoteFormModal(false);
  };

  return (
    <Card
      direction='column'
      w='100%'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='400'
          lineHeight='100%'>
            Current and Investment Accounts
        </Text>
        <Button 
          variant="outline" 
          colorScheme="brand" 
          size="md" 
          onClick={() => openAccountFormModal(null)}
        >
          + New Account
        </Button>

        {showAccountFormModal && <AccountFormModal account={selectedAccount} isOpen={showAccountFormModal} onClose={closeAccountFormModal} />}
        {showNoteFormModal && <NoteFormModal account={selectedAccount} isOpen={showNoteFormModal} onClose={closeNoteFormModal} />}

      </Flex>

      <Table {...getTableProps()} variant='simple' color='gray.500' size="sm" mb='24px' >
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "ID") {
                    data = (
                      <Flex align='center'>
                        <Text color={textColor} fontSize='sm' fontWeight='400'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "NAME") {
                    data = (
                      <Flex align='center'>
                        <Text color={textColor} fontSize='sm' fontWeight='400'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "TYPE") {
                    data = (
                      <Flex align='center'>
                        <Text color={textColor} fontSize='sm' fontWeight='400'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "CURRENCY") {
                    data = (
                      <Flex align='center'>
                        <Text color={textColor} fontSize='sm' fontWeight='400'>
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "BALANCE") {
                    data = (
                      <Text color={textColor} fontSize='sm' fontWeight='400'>
                        {currencyFormat(cell.value)}
                      </Text>
                    );
                  } else if (cell.column.Header === "ACTION") {
                    data = (
                      <Flex w="10px">
                        <Button leftIcon={<EditIcon/>} onClick={() => openAccountFormModal(row.values)}></Button>
                        <Button leftIcon={<DeleteIcon/>} onClick={() => deleteAccount(row.values.id)} ></Button>
                        <Button leftIcon={<ChatIcon/>} onClick={() => openNoteFormModal(row.values)} ></Button>
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
