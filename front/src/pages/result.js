import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { MonthlySaving, TargetDividend, SelectedStocks } from '../states';
import { caculateDividend } from '../utils/calculate-dividend';
import styles from './result.module.css';

export default function Result() {
    const [targetYear, setTargetYear] = useState(0);
    const [monthlyDividend, setMonthlyDividend] = useState([]);
    const monthlySaving = useRecoilValue(MonthlySaving);
    const targetDividend = useRecoilValue(TargetDividend);
    const selectedStocks = useRecoilValue(SelectedStocks);

    useEffect(() => {
        const result = caculateDividend(
            monthlySaving, 
            targetDividend, 
            selectedStocks
        );
        console.log(result);
        setMonthlyDividend(result);
        setTargetYear(result.length);
    }, [])

    return (
        <div>
            <h1>{`Target Year: ${targetYear}`}</h1>
            {monthlyDividend.map((dividend, index) => {
                return (
                    <div key={index}>
                        <h2>{`Year ${index+1}`}</h2>
                        <h3>{`Monthly Dividend: ${Math.round(dividend / 10000)}만원`}</h3>
                    </div>
                )
            })}
        </div>
    )
}
