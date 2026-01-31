
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
    // 答え (Answer) - 遠藤シナリオ: 遠藤と三浦
    { id: 'spot_a', x: 900, y: 270, radius: 80, type: 'answer', titleKey: 'SPOT_E_A_TITLE', descKey: 'SPOT_E_A_DESC' }, // 遠藤
    { id: 'spot_b', x: 583.5, y: 273, radius: 80, type: 'answer', titleKey: 'SPOT_E_B_TITLE', descKey: 'SPOT_E_B_DESC' }, // 三浦

    // 事件スポット (Incident) - 安嵜を見かける、芦田
    { id: 'anzaki', x: 140, y: 430, radius: 60, type: 'incident', titleKey: 'SPOT_E_ANZAKI_TITLE', descKey: 'SPOT_E_ANZAKI_DESC' },
    { id: 'ashida', x: 320.5, y: 248, radius: 60, type: 'incident', titleKey: 'SPOT_E_ASHIDA_TITLE', descKey: 'SPOT_E_ASHIDA_DESC' },
    { id: 'wildfire', x: 163.5, y: 131, radius: 60, type: 'incident', titleKey: 'SPOT_E_WILDFIRE_TITLE', descKey: 'SPOT_E_WILDFIRE_DESC' },
];
