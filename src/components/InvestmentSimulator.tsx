import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import InvestmentForm from './InvestmentForm';
import ResultsTable from './ResultsTable';
import './InvestmentSimulator.css';

interface InvestmentData {
  year: number;
  amount: number;
  interest: number;
  totalInterest: number;
}

function InvestmentSimulator() {
  const [data, setData] = useState<InvestmentData[]>([]);
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [years, setYears] = useState<number>(10);

  useEffect(() => {
    calculateInvestment();
  }, [initialAmount, interestRate, years]);

  const calculateInvestment = () => {
    const newData: InvestmentData[] = [];
    let currentAmount = initialAmount;
    let totalInterest = 0;

    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        newData.push({
          year,
          amount: currentAmount,
          interest: 0,
          totalInterest: 0
        });
      } else {
        const yearlyInterest = currentAmount * (interestRate / 100);
        totalInterest += yearlyInterest;
        currentAmount += yearlyInterest;
        
        newData.push({
          year,
          amount: currentAmount,
          interest: yearlyInterest,
          totalInterest
        });
      }
    }

    setData(newData);
  };

  const handleFormSubmit = (initial: number, rate: number, duration: number) => {
    setInitialAmount(initial);
    setInterestRate(rate);
    setYears(duration);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  return (
    <div className="investment-simulator">
      <h1>Simulateur d'investissement à intérêts composés</h1>
      
      <InvestmentForm 
        initialAmount={initialAmount}
        interestRate={interestRate}
        years={years}
        onSubmit={handleFormSubmit}
      />
      
      <div className="results-container">
        <div className="chart-container">
          <h2>Évolution du capital</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Année', position: 'insideBottomRight', offset: -10 }} />
              <YAxis 
                tickFormatter={(value) => `${(value / 1000).toFixed(0)} k€`}
                label={{ value: 'Capital (€)', angle: -90, position: 'insideLeft' }} 
              />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Line type="monotone" dataKey="amount" name="Capital" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="totalInterest" name="Intérêts cumulés" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <ResultsTable data={data} formatCurrency={formatCurrency} />
      </div>
    </div>
  );
}

export default InvestmentSimulator;