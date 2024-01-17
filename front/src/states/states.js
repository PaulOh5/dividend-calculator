import { atom } from "recoil";

export const SelectedStocksState = atom({
    key: 'selectedStocksState',
    default: []
});

export const SelectedStocksTableApiState = atom({
    key: 'selectedStocksTableApiState',
    default: null
});
