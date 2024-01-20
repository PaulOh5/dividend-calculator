import { Button } from "@mui/material";

import styles from './submit-button.module.css';

export default function SubmitButton(props) {

    const onClick = () => {
        const selectedStocks = [];
        props.selectedStocksTable.forEachNode(node => {
            selectedStocks.push({ticker: node.data.ticker, rate: node.data.rate});
        });
        const sum = selectedStocks.reduce((acc, cur) => acc + cur.rate, 0);
        if (sum !== 100) {
            alert('비중의 합은 100%가 되어야 합니다.');
            return;
        }

        const url = 'http://127.0.0.1:8000/stocks/caculate?data=' + JSON.stringify(selectedStocks);
        fetch(url, {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
        })
    }

    return (
        <Button className={styles.submitButton}
            variant="contained"
            color="primary"
            onClick={onClick}
        >
           계산하기
        </Button>
    );
}
