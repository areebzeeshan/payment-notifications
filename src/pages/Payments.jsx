import React, { useState } from 'react'
import PaymentCard from '../components/custom/PaymentCard';

const Payments = () => {

    const paymentsArray = [
        {
            title: 'Payments1',
            description: 'Payment for project 1',
            amount: 100,
            deadline: '2022-01-01',
            status: 'pending',
        },
        {
            title: 'Payments2',
            description: 'Payment for project 2',
            amount: 200,
            deadline: '2022-02-01',
            status: 'completed',
        },
        {
            title: 'Payments3',
            description: 'Payment for project 3',
            amount: 300,
            deadline: '2022-03-01',
            status: 'cancelled',
        }
    ];

    const [payments, setPayments] = useState(paymentsArray)

    return (
        <div>
            {paymentsArray.map((item, index) => (
                <PaymentCard
                    key={index}
                    title={item.title}
                    desc={item.description}
                    amount={item.amount}
                    deadline={item.deadline}
                    status={item.status}
                />
            ))}
        </div>
    )
}

export default Payments