# 実装計画: スポット判定ロジックへの移行

## 提案する変更

### 1. データ構造の定義
`app/game/constants.ts` (新規作成) にて、スポット情報を定義する。
座標は仮置きとし、後で調整可能にする。

```typescript
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
    { id: 'spot_a', x: 200, y: 150, radius: 80, type: 'required', titleKey: 'SPOT_A_TITLE', descKey: 'SPOT_A_DESC' },
    // 右下
    { id: 'spot_b', x: 760, y: 400, radius: 80, type: 'required', titleKey: 'SPOT_B_TITLE', descKey: 'SPOT_B_DESC' },
    // 中央 (旧高得点エリア)
    { id: 'spot_c', x: 480, y: 270, radius: 80, type: 'optional', titleKey: 'SPOT_C_TITLE', descKey: 'SPOT_C_DESC' },
    // その他
    { id: 'spot_d', x: 300, y: 400, radius: 60, type: 'optional', titleKey: 'SPOT_D_TITLE', descKey: 'SPOT_D_DESC' },
];
```

### 2. テキスト辞書の更新 (`utils/locales.ts`)
新しいエピソード用テキストを追加する。

```typescript
export const TEXT = {
  // ...既存
  EPISODE: {
    SPOT_A_TITLE: "犯人の手がかり",
    SPOT_A_DESC: "一瞬だけ見えた影...あれは犯人だったのか？",
    SPOT_B_TITLE: "重要な証拠",
    SPOT_B_DESC: "落ちていたコイン。これはあの事件の...",
    SPOT_C_TITLE: "懐かしい風景",
    SPOT_C_DESC: "昔よく遊んだ空き地だ。",
    // ...
    NOTHING_TITLE: "曖昧な記憶",
    NOTHING_DESC: "何も思い出せなかった..."
  }
}
```

### 3. ゲームロジックの変更 (`app/game/page.tsx`)
- `calculateScore` を廃止し、`checkSpotCollision(x, y)` を実装。
- `capturedPhotos` に `spotId` を含める。
- リザルト判定ロジックを変更:
    - 取得した `spotId` のリストを集計。
    - `required` なスポットIDが全て（今回は2つ）含まれているかチェック。
    - 条件達成 -> `setPhase('ending')`
    - 条件未達 -> `setPhase('result_loop')` (仮)
        - 撮影されたスポットのエピソードを表示。
        - 「もう一度思い出す」ボタンでリセット。

### 4. コンポーネント更新
- `MaskCamera` は変更不要（座標を返す機能は既存のまま）。
- `GamePage` (page.tsx) の JSX を更新し、リザルト画面でスコアではなくエピソードを表示するようにする。

## 検証計画 (`walkthrough.md`)
1. アプリを起動し `/game` へ移動。
2. **スポットA (左上付近)** と **スポットB (右下付近)** をクリックして撮影する。 (座標はログ等で確認しながら)
3. リザルト画面で**エンディング**へのボタンが表示されることを確認。
4. リセットして、今度は**何もない場所**を撮影する。
5. リザルト画面で「曖昧な記憶」等のメッセージが表示され、エンディングに行けない（ループ）ことを確認。
6. **スポットC** のみを撮影した場合、そのエピソードが表示されることを確認。

## 実行タスク
1. `utils/locales.ts` 更新
2. `app/game/constants.ts` 作成
3. `app/game/page.tsx` ロジック書き換え
