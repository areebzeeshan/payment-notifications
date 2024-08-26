import React, { useEffect, useState } from 'react'
import PaymentCard from '../components/custom/PaymentCard';
import { Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, TextField } from '@mui/material';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { database } from '../components/firebase/firebase';
import { SnackbarToast } from '../components/ui/StyledComponents';
import moment from 'moment';

const Payments = () => {

    const [payments, setPayments] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [paymentData, setPaymentData] = useState({
        title: '',
        description: '',
        amount: '',
        deadline: '',
        status: false,
    })
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)

    const onchangeHandler = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value })
    }

    const checkBoxhandler = (e) => {
        setPaymentData({ ...paymentData, status: e.target.checked })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await addDoc(collection(database, "payments"), {
                title: paymentData.title,
                description: paymentData.description,
                amount: paymentData.amount,
                deadline: moment(paymentData.deadline).format('DD-MM-YYYY'),
                status: paymentData.status,
            })

            if (res) {
                setMessage("Payment Task Submitted Successfully!")
                setOpen(true)
                setPaymentData({
                    title: '',
                    description: '',
                    amount: '',
                    deadline: '',
                    status: false,
                })
                setOpenDialog(false)
            }
        } catch (error) {
            console.log("Error in submitting payment task : ", error)
            setMessage("Submit Failed! " + error.message)
            setOpen(true)
        }
    }

    const getAllPayments = async () => {
        try {
            const querySnapshot = await getDocs(collection(database, "payments"));
            // console.log("querysnapshot : ",querySnapshot)
            querySnapshot.docs.map(doc => (
                // console.log("Fetching all payment docs : ", doc._document.data.value.mapValue.fields)
               { title: doc._document.data.value.fields.title,
                description: doc._document.data.value.fields.description,
                amount: doc._document.data.value.fields.amount,
                deadline: doc._document.data.value.fields.deadline,
                status: doc._document.data.value.fields.status,
            }
            ));
            // console.log(querySnapshot.docs)
            // console.log("payments : ", documents)
            // setPayments(documents)
        } catch (error) {
            console.error("Error retrieving documents: ", error);
        }
    }

    useEffect(() => {
        getAllPayments()
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <div className='flex justify-end mb-5'>
                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: "#333C4D",
                        "&:hover": {
                            backgroundColor: "#333C4D",
                        }
                    }}
                    onClick={() => setOpenDialog(true)}
                >
                    Add New Payment
                </Button>
            </div>
            {payments ? (payments.map((item, index) => (
                <PaymentCard
                    key={index}
                    title={item.title}
                    desc={item.description}
                    amount={item.amount}
                    deadline={item.deadline}
                    status={item.status}
                />
            ))) : (
                <CircularProgress />
            )}

            <Dialog
                open={openDialog}
                maxWidth="md"
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle fontWeight={'bold'}>Add New Payment</DialogTitle>
                <Divider />
                <DialogContent>
                    <Box
                        component={'form'}
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '2rem',
                            width: '100%',
                        }}
                    >
                        <TextField
                            type='text'
                            name='title'
                            label='Title'
                            value={paymentData.title}
                            onChange={onchangeHandler}
                            className='w-full mb-7'
                        />
                        <TextField
                            type='text'
                            name='description'
                            label='Description'
                            value={paymentData.description}
                            onChange={onchangeHandler}
                            className='w-full mb-7'
                        />
                        <TextField
                            type='number'
                            name='amount'
                            label='Amount'
                            value={paymentData.amount}
                            onChange={onchangeHandler}
                            className='w-full mb-7'
                        />
                        <TextField
                            type='date'
                            name='deadline'
                            title='Deadline'
                            value={paymentData.deadline}
                            onChange={onchangeHandler}
                            className='w-full mb-7'
                        />
                        <FormControlLabel control={
                            <Checkbox
                                value={paymentData.status}
                                onChange={checkBoxhandler}
                                name='status'
                            />} label="Paid" />
                        <Button
                            type='submit'
                            variant='contained'
                            className='w-full lg:w-[60%]'
                            sx={{
                                backgroundColor: "#333C4D",
                                "&:hover": {
                                    backgroundColor: "#333C4D"
                                }
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <SnackbarToast
                open={open}
                message={message}
                handleClose={handleClose}
            />
        </div>
    )
}

export default Payments