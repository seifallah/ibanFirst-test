interface IHolder {
    name:string
}

interface IHolderBank {
    bic:string
}

export default interface IAccount {
    id:string,
    accountNumber:string,
    amount:number,
    currency:string,
    holder:IHolder,
    holderBank:IHolderBank
}