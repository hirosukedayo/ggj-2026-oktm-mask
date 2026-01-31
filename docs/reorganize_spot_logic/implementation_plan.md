# Spot Logic Reorganization Implementation Plan

## Goal Description
スポットの判定ロジックを変更し、正解（2つの特定スポット）と事件スポット（3つの特定スポット）の組み合わせによる分岐を実装する。

## Proposed Changes

### [Define Spots] `app/game/constants.ts`
- `SpotType` を更新: `'answer' | 'incident' | 'optional'` (optionalは念のため残すが使わないかも)
- `SPOTS` 配列を更新:
    - `answer`: spot_a, spot_b
    - `incident`: murder, bicycle, wildfire (座標は指定通り)

### [Add Scenarios] `utils/locales.ts`
- `RESULT` オブジェクトに新しいシナリオキーを追加:
    - `SCENARIO_MURDER`
    - `SCENARIO_BICYCLE`
    - `SCENARIO_WILDFIRE`
    - `SCENARIO_MURDER_BICYCLE` etc. (組み合わせ)
    - `SCENARIO_ENDING` (既存のSCENARIO_Bをこれに充てるか、新規作成)

### [Logic Refactor] `app/game/page.tsx`
- `checkSpotCollision`: 現状維持（半径判定）
- `prepareResult`:
    - 判定ロジックを刷新。
    - 取得した写真の `spotId` リストを分析。
    - **Ending条件**: `spot_a` AND `spot_b` が含まれる。
    - **Incident条件**: `incident` タイプのスポットが含まれる場合、その組み合わせに応じたシナリオを選択。
    - **Failure条件**: 上記以外（片方のAnswerのみ、または何もなし）。既存の `SCENARIO_A` (Random) を使用。

## Verification Plan
### Manual Verification
- `npm run dev` で起動し、ゲームプレイを通じて確認。
- 各スポットの座標付近（シミュレータ上で推測）を撮影し、期待されるリザルト画面が出るか確認。
    - A + B -> Ending
    - Murderのみ -> Murder Result
    - Aのみ -> Random Result
