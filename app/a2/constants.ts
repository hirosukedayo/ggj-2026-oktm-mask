
export type SpotType = 'answer' | 'incident' | 'optional';

export interface Spot {
    id: string;
    x: number;
    y: number;
    radius: number;
    type: SpotType;
    titleKey: string;
    descKey: string;
}

export const SPOTS: Spot[] = [
    // 答え (Answer) - 芦田シナリオ: 芦田と遠藤
    { id: 'spot_a', x: 320.5, y: 248, radius: 80, type: 'answer', titleKey: 'SPOT_A_A_TITLE', descKey: 'SPOT_A_A_DESC' }, // 芦田（加害者）
    { id: 'spot_b', x: 900, y: 270, radius: 80, type: 'answer', titleKey: 'SPOT_A_B_TITLE', descKey: 'SPOT_A_B_DESC' }, // 遠藤

    // 事件スポット (Incident) - 三浦、山火事、安嵜
    { id: 'miura', x: 583.5, y: 273, radius: 60, type: 'incident', titleKey: 'SPOT_A_MIURA_TITLE', descKey: 'SPOT_A_MIURA_DESC' },
    { id: 'wildfire', x: 163.5, y: 131, radius: 60, type: 'incident', titleKey: 'SPOT_A_WILDFIRE_TITLE', descKey: 'SPOT_A_WILDFIRE_DESC' },
    { id: 'anzaki', x: 140, y: 430, radius: 60, type: 'incident', titleKey: 'SPOT_A_ANZAKI_TITLE', descKey: 'SPOT_A_ANZAKI_DESC' },
];
