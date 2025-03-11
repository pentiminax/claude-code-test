import './ResultsTable.css';

interface InvestmentData {
  year: number;
  amount: number;
  interest: number;
  totalInterest: number;
}

interface ResultsTableProps {
  data: InvestmentData[];
  formatCurrency: (value: number) => string;
}

function ResultsTable({ data, formatCurrency }: ResultsTableProps) {
  return (
    <div className="results-table-container">
      <h2>Tableau des résultats</h2>
      <div className="table-responsive">
        <table className="results-table">
          <thead>
            <tr>
              <th>Année</th>
              <th>Capital</th>
              <th>Intérêts de l'année</th>
              <th>Intérêts cumulés</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.year}>
                <td>{entry.year}</td>
                <td>{formatCurrency(entry.amount)}</td>
                <td>{formatCurrency(entry.interest)}</td>
                <td>{formatCurrency(entry.totalInterest)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length > 0 && (
        <div className="summary">
          <p><strong>Capital final :</strong> {formatCurrency(data[data.length - 1].amount)}</p>
          <p><strong>Intérêts totaux générés :</strong> {formatCurrency(data[data.length - 1].totalInterest)}</p>
          <p><strong>Multiplicateur :</strong> {(data[data.length - 1].amount / data[0].amount).toFixed(2)}x</p>
        </div>
      )}
    </div>
  );
}

export default ResultsTable;