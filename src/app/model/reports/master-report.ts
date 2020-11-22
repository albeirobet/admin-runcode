export interface IMasterReport {
    _id?: string;
    seniorAccountantId?: string;
    seniorAccountantName?: string;
    postingDate?: string;
    accountingSeat?: string;
    externalReferenceId?: string;
    originalDocumentId?: string;
    accountingSeatType?: string;
    accountingSeatAnnulled?: string;
    originalDocumentAnnulledId?: string;
    accountingSeatAnnulment?: string;
    extraOriginalDocumentAnulledId?: string;
    extraOriginalDocumentId?: string;
    originalDocumentPosition?: string;
    debtAmountCompanyCurrency?: string;
    creditAmountCompanyCurrency?: string;
    companyId?: string;
    userId?: string;
}

export class MasterReport implements IMasterReport {
    constructor(
        public _id?: string,
        public seniorAccountantId?: string,
        public seniorAccountantName?: string,
        public postingDate?: string,
        public accountingSeat?: string,
        public externalReferenceId?: string,
        public originalDocumentId?: string,
        public accountingSeatType?: string,
        public accountingSeatAnnulled?: string,
        public originalDocumentAnnulledId?: string,
        public accountingSeatAnnulment?: string,
        public extraOriginalDocumentAnulledId?: string,
        public extraOriginalDocumentId?: string,
        public originalDocumentPosition?: string,
        public debtAmountCompanyCurrency?: string,
        public creditAmountCompanyCurrency?: string,
        public companyId?: string,
        public userId?: string) {}
}