export const caculateDividend = (monthlySaving, targetDividend, selectedStocks) => {
    let stocks = [];
    for (let i = 0; i < selectedStocks.length; i++) {
        stocks.push({...selectedStocks[i]});
    }
    const yearlySaving = monthlySaving * 12;
    let totalSaving = 0;
    let yearlyDividend = 0;
    let monthlyDividend = [];
    const tax = 0.15;
    while (yearlyDividend/12 < targetDividend) {
        totalSaving += yearlySaving;
        let dividendYieldSum = 0;
        stocks.map(stock => {
            dividendYieldSum = stock.rate * stock.dividend_yield;
            stock.dividend_yield += stock.dividend_yield * stock.dividend_growth_5y;
        });
        yearlyDividend = dividendYieldSum * totalSaving * (1 - tax);
        totalSaving += yearlyDividend;
        monthlyDividend.push(yearlyDividend/12);
    }
    return monthlyDividend;
}
