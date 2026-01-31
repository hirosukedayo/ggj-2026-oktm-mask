
export type SpotType = 'answer' | 'incident' | 'optional';

export interface Spot {
    id: string; // 'cat', 'coin', etc.
    x: number;
    y: number;
    radius: number;
    type: SpotType;
    titleKey: string; // localesのキー
    descKey: string;
}

export const SPOTS: Spot[] = [
    // 答え (Answer)
    { id: 'spot_a', x: 900, y: 270, radius: 80, type: 'answer', titleKey: 'SPOT_A_TITLE', descKey: 'SPOT_A_DESC' },
    { id: 'spot_b', x: 140, y: 430, radius: 80, type: 'answer', titleKey: 'SPOT_B_TITLE', descKey: 'SPOT_B_DESC' },

    // 事件スポット (Incident)
    { id: 'murder', x: 583.5, y: 273, radius: 60, type: 'incident', titleKey: 'SPOT_MURDER_TITLE', descKey: 'SPOT_MURDER_DESC' },
    { id: 'bicycle', x: 320.5, y: 248, radius: 60, type: 'incident', titleKey: 'SPOT_BICYCLE_TITLE', descKey: 'SPOT_BICYCLE_DESC' },
    { id: 'wildfire', x: 163.5, y: 131, radius: 60, type: 'incident', titleKey: 'SPOT_WILDFIRE_TITLE', descKey: 'SPOT_WILDFIRE_DESC' },
];
