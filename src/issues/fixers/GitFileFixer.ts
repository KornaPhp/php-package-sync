/* eslint-disable no-unused-vars */

import { ComparisonKind } from '../../types/FileComparisonResult';
import { FileMerger } from '../../lib/FileMerger';
import { Fixer } from './Fixer';
import { PackageIssue } from '../PackageIssue';

export class GitFileFixer extends Fixer {
    public static handles = [ComparisonKind.ALLOWED_SIZE_DIFFERENCE_EXCEEDED];

    public static canFix(issue: PackageIssue): boolean {
        if (issue.resolved) {
            return false;
        }

        return ['.gitattributes', '.gitignore'].includes(issue.result.name);
    }

    public fix(): boolean {
        const relativeFn: string = this.issue.result.name;
        const sourceFn = `${this.issue.skeletonPath}/${relativeFn}`;
        const targetFn = `${this.issue.repositoryPath}/${relativeFn}`;

        FileMerger.create()
            .add(sourceFn, targetFn)
            .mergeAndSave(targetFn);

        this.issue.resolved = true;

        console.log(`GIT FILE FIXER: merged '${relativeFn}'`);

        return true;
    }

    public static prettyName(): string {
        return 'merge-files';
    }
}
