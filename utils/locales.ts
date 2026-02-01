export type SegmentType = 'protagonist' | 'psychiatrist' | 'narrator';

export interface TextSegment {
    text: string;
    type?: SegmentType;
    style?: React.CSSProperties;
}




