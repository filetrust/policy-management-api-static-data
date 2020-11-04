import AzureFileShareService from "./azureFileShareService";
import { Policy, PolicyType } from "../models/policy";

const jsonBuffer = (obj: any) => {
    const json = JSON.stringify(obj);
    return Buffer.from(json);
}

export default class StaticDataService {
    amountOfHistoricalPolicies: number;
    shareService: AzureFileShareService;

    constructor(shareService: AzureFileShareService, amountOfHistoricalPolicies: number) {
        this.shareService = shareService;
        this.amountOfHistoricalPolicies = amountOfHistoricalPolicies;
    }

    async Generate(): Promise<void> {
        for (let i = 0; i < this.amountOfHistoricalPolicies; i++) {
            const policy = Policy.Historic(new Date());
            const fileDirectory = this.getFileDirectory(policy);
            console.log(`Generating historical policy for timestamp '${policy.LastEdited}' ${fileDirectory}`);
            await this.shareService.uploadFile(fileDirectory, "policy.json", jsonBuffer(policy));
        }
        
        const draftpolicy = Policy.Draft(new Date());
        const draftpolicyfileDirectory = this.getFileDirectory(draftpolicy);
        console.log(`Generating draft policy for timestamp '${draftpolicy.LastEdited}' ${draftpolicyfileDirectory}`);
        await this.shareService.uploadFile(draftpolicyfileDirectory, "policy.json", jsonBuffer(draftpolicy));
        
        const policy = Policy.Current(new Date());
        const fileDirectory = this.getFileDirectory(policy);
        console.log(`Generating published policy for timestamp '${policy.LastEdited}' ${fileDirectory}`);
        await this.shareService.uploadFile(fileDirectory, "policy.json", jsonBuffer(policy));
    }

    private getFileDirectory(policy: Policy): string {
        if (policy.PolicyType === PolicyType.Draft) 
             return "draft";             

        if (policy.PolicyType === PolicyType.Current) 
            return "current";

        return `historical/${policy.Id}`;
    }
}