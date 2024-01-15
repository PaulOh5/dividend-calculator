import MoneyInput from '../components/money-input/money-input.js';
import StockTable from '../components/stock-table/stock-table';
import SelectedStockTable from '../components/selected-stock-table/selected-stock-table';

import styles from './main.module.css';

export default function Home() {
  return (
    <div style={{height: '100%'}}>
      <MoneyInput/>
      <div className={styles.tableContainer}>
        <div className={styles.stockListTable}>
          <StockTable/>
        </div>
        <div className={styles.selectedStockTable}>
          <SelectedStockTable/>
        </div>
      </div>
    </div>
  )
}
