import { useState, FormEvent } from 'react';
import './InvestmentForm.css';

interface InvestmentFormProps {
  initialAmount: number;
  interestRate: number;
  years: number;
  onSubmit: (initialAmount: number, interestRate: number, years: number) => void;
}

function InvestmentForm({ initialAmount, interestRate, years, onSubmit }: InvestmentFormProps) {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [rate, setRate] = useState<number>(interestRate);
  const [duration, setDuration] = useState<number>(years);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(amount, rate, duration);
  };

  return (
    <div className="investment-form-container">
      <form onSubmit={handleSubmit} className="investment-form">
        <div className="form-group">
          <label htmlFor="initial-amount">Montant initial (€)</label>
          <input
            id="initial-amount"
            type="number"
            min="0.01"
            step="any"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="interest-rate">Taux d'intérêt annuel (%)</label>
          <input
            id="interest-rate"
            type="number"
            min="0.1"
            max="50"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="years">Durée (années)</label>
          <input
            id="years"
            type="number"
            min="1"
            max="50"
            step="1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
          />
        </div>

        <button type="submit" className="calculate-button">Calculer</button>
      </form>
    </div>
  );
}

export default InvestmentForm;