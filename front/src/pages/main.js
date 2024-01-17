import { useState } from 'react';

import MoneyInput from '../components/money-input/money-input.js';
import StockTable from '../components/stock-table/stock-table';
import SelectedStockTable from '../components/selected-stock-table/selected-stock-table';

import styles from './main.module.css';

export default function Home() {
  const [selectedStocksTable, setSelectedStocksTable] = useState(null);

  return (
    <div style={{height: '100%'}}>
      <MoneyInput/>
      <div className={styles.tableContainer}>
        <div className={styles.stockListTable}>
          <StockTable selectedStocksTable={selectedStocksTable}/>
        </div>
        <div className={styles.selectedStockTable}>
          <SelectedStockTable setSelectedStocksTable={setSelectedStocksTable}/>
        </div>
      </div>
    </div>
  )
}
