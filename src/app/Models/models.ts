
export interface ILogin {
    email: string,
    password: string
}
export class Login {
    constructor(
        public email: string,
        public password: string,
        public userId: string,
        public token: string

    ) { }
}

export class ContractData {
    constructor(
        public autorenewal: string,
        public company: string,
        public installdate: Date,
        public billingdate: Date,
        public billingcontact: string,
        public TechnicalContact: string,
        public suppliercontact: string,
        public supplier: string,
        public suppliercontract: string,
        public renewaldate: Date,
        public nrc: string,
        public managedcontract: string,
        public decisionprocess: string,
        public decisionmakercontract: string,
        public DecisionDays: string,
        public Industry: string,
        public contractname: string,
        public StrategyContact: string,
        public techcontract: string,
        public TechType: string,
        public porequired: string,
        public po: string,
        public YearlySpend: string,
        public mrc: string,
        public msa: string,
        public name: string,
        public msanoticedates: Date,
        public signeddate: Date,
        public stage: number,
        public FRNDate: Date,
        public SRNDate: Date,
        public TRNDate: Date,
        public FinalDate: Date
    ) { }

}
