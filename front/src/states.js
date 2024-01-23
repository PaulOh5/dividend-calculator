import { atom } from 'recoil';

export const MonthlySaving = atom({
    key: 'monthlySaving',
    default: 0,
});

export const TargetDividend = atom({
    key: 'targetDividend',
    default: 0,
});
