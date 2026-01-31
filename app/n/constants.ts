
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
    // 答え (Answer) - 名城シナリオ: 名城と山（我拝師山）
    { id: 'spot_a', x: 320.5, y: 248, radius: 80, type: 'answer', titleKey: 'SPOT_N_A_TITLE', descKey: 'SPOT_N_A_DESC' }, // 名城（自転車の人物）
    { id: 'spot_b', x: 163.5, y: 131, radius: 80, type: 'answer', titleKey: 'SPOT_N_B_TITLE', descKey: 'SPOT_N_B_DESC' }, // 我拝師山

    // 事件スポット (Incident) - 殺人現場、安嵜、遠藤
    { id: 'murder', x: 583.5, y: 273, radius: 60, type: 'incident', titleKey: 'SPOT_N_MURDER_TITLE', descKey: 'SPOT_N_MURDER_DESC' },
    { id: 'anzaki', x: 140, y: 430, radius: 60, type: 'incident', titleKey: 'SPOT_N_ANZAKI_TITLE', descKey: 'SPOT_N_ANZAKI_DESC' },
    { id: 'endo', x: 900, y: 270, radius: 60, type: 'incident', titleKey: 'SPOT_N_ENDO_TITLE', descKey: 'SPOT_N_ENDO_DESC' },
];
