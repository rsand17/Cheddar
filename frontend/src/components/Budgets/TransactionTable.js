import React, { useState, useEffect } from "react";
import { Table } from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import '../../css/Budgets.css';

function TransactionTable(props) {
  const [transactions, setTransactions] = useState(); // array of all transactions
  const [loadingTransactions, setLoadingTransactions] = useState(true); // state to check if transactions are received yet
  const [sortKey, setSortKey] = useState('date'); // field the table is sorted by
  const [sortNameAsc, setSortNameAsc] = useState(false);  // if name should be in ascending order
  const [sortAmountAsc, setSortAmountAsc] = useState(false);  // if amount should be in ascending order
  const [sortDateAsc, setSortDateAsc] = useState(false);  // if date should be in ascending order
  const [sortCategoryAsc, setSortCategoryAsc] = useState(false);  // if category should be in ascending order

	useEffect(
		() => {
      getTransactions();
		},
		[props]
	);

  // get all transactions for a budget
  const getTransactions = () => {
		axios.get(`http://localhost:8080/Cheddar/Budgets/Budget/Transactions/${props.userID}/${props.curBudget.name}`)
			.then((response) => {
        // format the date for display
        for (let i in response.data) {
          let date = new Date(response.data[i].date);
          response.data[i].shortDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        }

				setTransactions(response.data);
        setLoadingTransactions(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

  // sort the transactions table by a particular field
  const sortTransactions = (key) => {
    let sortAsc = '';
    if (key === 'name') {
      sortAsc = !sortNameAsc;
      setSortNameAsc(!sortNameAsc);
    } else if (key === 'amount') {
      sortAsc = !sortAmountAsc;
      setSortAmountAsc(!sortAmountAsc);
    } else if (key === 'date') {
      sortAsc = !sortDateAsc;
      setSortDateAsc(!sortDateAsc);
    } else if (key === 'category') {
      sortAsc = !sortCategoryAsc;
      setSortCategoryAsc(!sortCategoryAsc);
    }

    setSortKey(key);

    let tmp = JSON.parse(JSON.stringify(transactions));
    tmp.sort((a, b) => {
      if (a[key] < b[key])
         return sortAsc ? -1 : 1;
      else if (a[key] > b[key])
         return sortAsc ? 1 : -1;
      else
         return 0;
    });

    setTransactions(tmp);
  }

	return (
    <div>
      <Table striped size="sm">
        <thead>
          <tr align="left">
            <th className="poundSymbol">#</th>
            <th className="tableHeader" onClick={() => sortTransactions('name')}>Name{' '}
              <span hidden={sortKey !== 'name' || !sortNameAsc}><FontAwesomeIcon icon={faCaretUp}/></span>
              <span hidden={sortKey !== 'name' || sortNameAsc}><FontAwesomeIcon icon={faCaretDown}/></span>
            </th>
            <th className="tableHeader" onClick={() => sortTransactions('amount')}>Amount{' '}
              <span hidden={sortKey !== 'amount' || !sortAmountAsc}><FontAwesomeIcon icon={faCaretUp}/></span>
              <span hidden={sortKey !== 'amount' || sortAmountAsc}><FontAwesomeIcon icon={faCaretDown}/></span>
            </th>
            <th className="tableHeader" onClick={() => sortTransactions('date')}>Date{' '}
              <span hidden={sortKey !== 'date' || !sortDateAsc}><FontAwesomeIcon icon={faCaretUp}/></span>
              <span hidden={sortKey !== 'date' || sortDateAsc}><FontAwesomeIcon icon={faCaretDown}/></span>
            </th>
            <th className="tableHeader" onClick={() => sortTransactions('category')}>Category{' '}
              <span hidden={sortKey !== 'category' || !sortCategoryAsc}><FontAwesomeIcon icon={faCaretUp}/></span>
              <span hidden={sortKey !== 'category' || sortCategoryAsc}><FontAwesomeIcon icon={faCaretDown}/></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {!loadingTransactions && transactions.map((key, index) => {
            return <tr key={transactions[index]._id} align="left">
              <td scope="row" align="center">{index + 1}</td>
              <td>{transactions[index].name}</td>
              <td>${transactions[index].amount}</td>
              <td>{transactions[index].shortDate}</td>
              <td>{transactions[index].category}</td>
            </tr>
          })}
        </tbody>
      </Table>
    </div>
	);
}

export default TransactionTable;