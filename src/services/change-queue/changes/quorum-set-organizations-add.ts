import {QuorumSet, Organization} from '@stellarbeat/js-stellar-domain';
import {NetworkChange} from '@/services/change-queue/network-change-queue';

export class QuorumSetOrganizationsAdd implements NetworkChange {
    _quorumSet: QuorumSet;
    _organizations: Organization[];

    constructor(quorumSet: QuorumSet, organizations: Organization[]) {
        this._quorumSet = quorumSet;
        this._organizations = organizations;
    }

    execute(): void {
        this._organizations.forEach(organization => {
            let organizationQuorumSet = new QuorumSet();
            organizationQuorumSet.validators.push(...organization.validators);
            organizationQuorumSet.threshold = organization.subQuorumThreshold;
            this._quorumSet.innerQuorumSets.push(organizationQuorumSet);
        });
    }

    revert(): void {
        this._organizations.forEach(organization => this._quorumSet.innerQuorumSets.pop());
    }
}