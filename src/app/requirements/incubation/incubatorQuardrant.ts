import { ScoreCard } from './scoreCard';
import { QuardrantQuarter } from './quardrantQuarter';
import { FieldSetGroup } from '../fieldSetGroup';

export class IncubatorQuardrant{
    public scoreCard: ScoreCard;
    public name: string;
    public description: string;
    public incubatorQuardrantID: number;
    public quardrantQuarters: QuardrantQuarter[];
    public fieldSetGroups: FieldSetGroup;
    public isValid: boolean;
    public isDirty: boolean;
}
