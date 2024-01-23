import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { MonthlySaving, TargetDividend } from '../../states';

import TextField from '@mui/material/TextField';

import styles from './money-input.module.css';

export default function MoneyInput() {
    const setMoney = useSetRecoilState(MonthlySaving);
    const [moneyInput, setMoneyInput] = useState('');
    const [moneyString, setMoneyString] = useState('');

    const setDividend= useSetRecoilState(TargetDividend);
    const [dividendInput, setDividendInput] = useState('');
    const [dividendString, setDividendString] = useState('');
  
    const onChangeMoney = (e) => {
      const value = e.target.value;
      const number = value.replace(/^0+|[^0-9]+/g, '');
      setMoney(number);
      const numberWithComma = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setMoneyInput(numberWithComma);
      setMoneyString(numberToKoreanMoney(number));
    }
  
    const onChangeDividend = (e) => {
      const value = e.target.value;
      const number = value.replace(/^0+|[^0-9]+/g, '');
      setDividend(number);
      const numberWithComma = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      setDividendInput(numberWithComma);
      setDividendString(numberToKoreanMoney(number));
    }
  
    const numberToKoreanMoney = (numStr) => {
      let result = '';
      const len = numStr.length;
      if (len < 5) {
        result = addComma(numStr);
      } else if (len < 9 && len > 4) {
        let man = addComma(parseInt(numStr.slice(0, len-4), 10).toString());
        let other = addComma(parseInt(numStr.slice(len-4), 10).toString());
        result = man + '만' + (other !== '0' ? other : '');
      } else if (len < 13 && len > 8) {
        let uck = addComma(parseInt(numStr.slice(0, len-8), 10).toString());
        let man = addComma(parseInt(numStr.slice(len-8, len-4), 10).toString());
        let other = addComma(parseInt(numStr.slice(len-4), 10).toString());
        result = uck + '억' + 
                  (man !== '0' ? man + '만' : '') + 
                  (other !== '0' ? other : '');
      } else if (len > 8) {
        let jo = addComma(parseInt(numStr.slice(0, len-12), 10).toString());
        let uck = addComma(parseInt(numStr.slice(len-12, len-8), 10).toString());
        let man = addComma(parseInt(numStr.slice(len-8, len-4), 10).toString());
        let other = addComma(parseInt(numStr.slice(len-4), 10).toString());
        result = jo + '조' +
                  (uck !== '0' ? uck + '억' : '') +
                  (man !== '0' ? man + '만' : '') + 
                  (other !== '0' ? other : '');
      }
      
      return result === '' || result === '0' ? '' : result + '원';
    }
  
    const addComma = (numStr) => {
      const len = numStr.length;
      let result = '';
      for (let i=0; i<len; i++) {
        const digit = numStr[len-i-1];
        if ((i+1)%4 === 0) {
          result = digit + ',' + result;
        } else {
          result = digit + result;
        }
      }
      return result;
    }
  
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.input}>
            <label>매달 적립금:</label>
            <TextField 
              label='매달 적립금'
              size='small' 
              value={moneyInput} 
              onChange={onChangeMoney}/>
          </div>
            <p>{moneyString}</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.input}>
          <label>희망 월배당:</label>
          <TextField 
            label='희망 월배당'
            size='small'
            value={dividendInput}
            onChange={onChangeDividend}  
          />
          </div>
          <p>{dividendString}</p>
        </div>
      </div>
    )
  }
