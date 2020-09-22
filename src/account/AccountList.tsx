import  React, { useEffect, useState, useMemo }  from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Account.css';
import IAccount from './IAccountModels'
import accountApi from "./AccountApi";
import { InputLabel, Grid } from "@material-ui/core";


const currencies = ["EUR", "USD", "GBP"];

const AccountList = () => {
    const [accounts, setAccounts] = useState([]);
    const [currency, setCurrency] = useState("EUR");
    const [rate, setRate] = useState(1);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState("");

    const fetechAccounts = async () => {
        setloading(true);
        const result = await accountApi.get();
        if(result.accounts) {
            //@ts-ignore
            setAccounts(result.accounts.sort((a, b) => b.amount - a.amount));
        }
        else {
            setError("An error occured occured, please try again later");
        }
        setloading(false)
    };

    const handleChange = async (event) => {
        setloading(true);
        const response = await accountApi.getRate(currency+event.target.value);
        if(response.status===200) {
           //@ts-ignore
            setRate(response.rate.rate)
            setCurrency(event.target.value);
        } else {
            //@ts-ignore
            setError(response.errorMessage);
        }
        setloading(false);
    };

    useEffect(() => {
        fetechAccounts();
    }, []);
    
    useEffect(() => {
        const interval = setInterval(() => {
            fetechAccounts();
        }, 15000);
        return () => clearInterval(interval);
      }, []);
        const currencySymbol = currency==="EUR"?"€":(currency==="USD"?"$":"£");
        const renderSelectCurrency = useMemo( () => <Grid container spacing={3} className={"header"}>
            <Grid item xs={12}>
            <Paper>
            <FormControl>
            <InputLabel id="demo-simple-select-label">Current currency</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                onChange={handleChange}
                label="currency"
                >
                {
                    currencies.map((currency, index) => <MenuItem key={index} value={currency}>{currency}</MenuItem>)
                }
                </Select>
            </FormControl>
        
            </Paper>
            </Grid>
        </Grid>,
            [currency]
            );
    
    return <div>
        <h2>Account List</h2>
        {loading&&<div className="loadingContainer"><CircularProgress /></div>}
        {error&&<div className="errorContainer">{error}</div>}
        { renderSelectCurrency }
 
        <TableContainer component={Paper}>
            <Table className={"table"} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Holder</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Bic</TableCell>
                        <TableCell>Amount/currency</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {accounts.length>0?accounts.map((row:IAccount) => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.holder.name}</TableCell>
                        <TableCell>{row.accountNumber}</TableCell>
                        <TableCell>{row.holderBank.bic}</TableCell>
                        <TableCell><b>{currencySymbol} </b>{currency==="EUR"?row.amount:(row.amount*rate)}</TableCell>
                </TableRow>
                )):
                <TableRow key={0} className="text-center"><TableCell>No data</TableCell></TableRow>
                }
                </TableBody>
            </Table>
            </TableContainer>
        </div> 

}

export default AccountList;