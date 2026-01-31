# Spot Logic Reorganization Walkthrough

## Changes Made

### Spot Definitions (`app/game/constants.ts`)
- Updated `SPOTS` array to include:
    - **Answer Spots**: `spot_a` (900, 270), `spot_b` (100, 450)
    - **Incident Spots**: `murder` (583.5, 273), `bicycle` (320.5, 248), `wildfire` (163.5, 131)
- Updated `SpotType` to `'answer' | 'incident' | 'optional'`.

### Scenario Texts (`utils/locales.ts`)
- Added scenario placehoders for:
    - `SCENARIO_MURDER`
    - `SCENARIO_BICYCLE`
    - `SCENARIO_WILDFIRE`
    - `SCENARIO_ENDING` (True Ending)
- Updated `EPISODE` titles and descriptions for the new spots.

### Logic Implementation (`app/game/page.tsx`)
- Refactored `prepareResult` to implement the following logic:
    1.  **True Ending**: If both `spot_a` and `spot_b` are captured -> Show `SCENARIO_ENDING`.
    2.  **Incident**: If an incident spot (`murder`, `bicycle`, `wildfire`) is captured -> Show specific scenario for that incident.
    3.  **Failure**: If neither of the above (e.g., only one answer spot, or nothing) -> Show random `SCENARIO_A`.
- Updated "Ending Button" logic to appear only when the True Ending condition is met.

## Verification Steps

### Manual Verification
1.  **Launch the Game**: `npm run dev`
2.  **Test True Ending**:
    - Capture near `x: 900, y: 270` (Spot A).
    - Capture near `x: 100, y: 450` (Spot B).
    - **Expectation**: Result screen shows "真実から目を逸らさないでください..." and "全て思い出す" button appears.
3.  **Test Incident (Murder)**:
    - Capture near `x: 583.5, y: 273` (Murder).
    - Capture a random spot or nothing.
    - **Expectation**: Result screen shows "血の匂いがした気がする..." and "もう一度思い出す" button.
4.  **Test Failure (Single Answer)**:
    - Capture near `x: 900, y: 270` (Spot A).
    - Capture nothing else.
    - **Expectation**: Result screen shows a random scenario from `SCENARIO_A` and "もう一度思い出す" button.
