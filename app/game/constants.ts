
export type SpotType = 'required' | 'optional';

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
    // 仮の座標定義 (960x540 ベース)
    // 左上
    { id: 'spot_a', x: 900, y: 270, radius: 80, type: 'required', titleKey: 'SPOT_A_TITLE', descKey: 'SPOT_A_DESC' },
    // 右下
    { id: 'spot_b', x: 100, y: 500, radius: 80, type: 'required', titleKey: 'SPOT_B_TITLE', descKey: 'SPOT_B_DESC' },
    // 中央 (旧高得点エリア)
    { id: 'spot_c', x: 480, y: 270, radius: 80, type: 'optional', titleKey: 'SPOT_C_TITLE', descKey: 'SPOT_C_DESC' },
    // その他
    { id: 'spot_d', x: 300, y: 400, radius: 60, type: 'optional', titleKey: 'SPOT_D_TITLE', descKey: 'SPOT_D_DESC' },
];
