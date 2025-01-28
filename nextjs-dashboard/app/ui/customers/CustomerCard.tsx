import React from 'react';

interface CustomerCardProps {
    name: string;
    photo: string;
    loanTaken: string;
    loanRepayment: string;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ name, photo, loanTaken, loanRepayment }) => {
    const handleClick = () => {
        alert(`Loan Taken: ${loanTaken}\nRepayment Due: ${loanRepayment}`);
    };

    return (
        <div className="customer-card" onClick={handleClick}>
            <img src={photo} alt={name} className="customer-photo" />
            <h3 className="customer-name">{name}</h3>
        </div>
    );
};

export default CustomerCard;
