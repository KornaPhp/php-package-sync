/* eslint-disable no-unused-vars */

import { ComparisonKind } from '../../types/FileComparisonResult';
import { Fixer } from './Fixer';
import { PackageIssue } from '../PackageIssue';

export class OptionalPackagesFixer extends Fixer {
    public static handles = [ComparisonKind.PACKAGE_NOT_USED, ComparisonKind.PACKAGE_SCRIPT_NOT_FOUND];

    public static canFix(issue: PackageIssue): boolean {
        if (issue.resolved) {
            return false;
        }

        return this.config()
            ?.includes(issue.result.name) ?? false;
    }

    public fix(): boolean {
        this.issue.resolved = true;

        console.log(`OPTIONAL PACKAGES FIXER: skipping '${this.issue.result.name}'`);

        return true;
    }

    public static prettyName(): string {
        return 'skip-dep';
    }
}
