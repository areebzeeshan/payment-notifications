import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material'
import React from 'react'


const PaymentCard = ({ title, desc, amount, deadline, status }) => {
    return (
        <Card sx={{
            maxWidth: '500px',
            margin: '10px',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        }}>
            <CardContent>
                <CardHeader title={title} />
                <span><span className='font-semibold'>Description: </span>{desc}</span> <br />
                <span><span className='font-semibold'>Amount: </span> ${amount}</span> <br />
                <span><span className='font-semibold'>Deadline: </span>: {deadline}</span> <br />
                <span><span className='font-semibold'>Status: </span>: {status}</span> <br />
            </CardContent>
            <CardActions>
                <Button variant='contained'>Edit</Button>
                <Button sx={{
                    backgroundColor: "#FF7043",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#FF7043",
                        color: "white"
                    }
                }}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default PaymentCard