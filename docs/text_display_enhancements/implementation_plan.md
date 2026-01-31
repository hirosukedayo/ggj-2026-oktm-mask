# Text Display Enhancements Implementation Plan

## Goal Description
Enhance the text display in Prologue, Result, and Ending scenes.
- **Prologue**: Split text into two parts, click to advance.
- **Result**: Implement a conversation style text display (Red for Main Character, White for Psychiatrist).
- **Ending**: Flexible text display.

## User Review Required
- **Result Conversation Text**: The current `locales.ts` does not contain the conversation text for the Result scene. I will add placeholder text or structure it so it can be easily added.
- **Ending Text**: Similar to Result, I will create a flexible structure.

## Proposed Changes

## Proposed Changes

### Components

#### [NEW] `components/ClickToAdvanceText/ClickToAdvanceText.tsx`
- **Props**:
    - `segments`: Array of text segments. Each segment can be:
        - String (simple text)
        - Object: `{ text: string, type: 'protagonist' | 'psychiatrist' | 'narrator', style?: CSSProperties }`
    - `onComplete`: Callback when all segments are finished.
- **Logic**:
    - State `currentIndex`.
    - Click handler increments `currentIndex`.
    - If `currentIndex` >= `segments.length`, call `onComplete`.
    - Support "fade in" animation for new segments.

#### [NEW] `components/ClickToAdvanceText/ClickToAdvanceText.module.css`
- Styles for `protagonist` (Red text).
- Styles for `psychiatrist` (White text, maybe different alignment or font style).
- Styles for `narrator` (Standard).
- Animation classes.

### App Logic

#### [MODIFY] `utils/locales.ts`
- Update `PROLOGUE` to include the specific arrays.
- Add `RESULT.SCENARIO_A` (Array of 3 patterns).
    - Pattern 1: A-1 Text (Protagonist / Psychiatrist)
    - Pattern 2: A-2 Text
    - Pattern 3: A-3 Text
- Add `RESULT.SCENARIO_B` (Placeholder for now).

#### [MODIFY] `app/page.tsx` (Prologue)
- Use `ClickToAdvanceText`.
- **Flow**:
    1. Title Screen (Start Button)
    2. Prologue Text Sequence (Click to advance)
    3. Transition to Game (`/game`)

#### [MODIFY] `app/game/page.tsx` (Result)
- **Logic for Result Type**:
    - Check captured photos.
    - If **ALL** captured photos are `type: 'optional'` (or no spot) -> **Result A** (Non-event related).
    - If **ANY** captured photo is `type: 'required'` -> **Result B** (Event related). (This is a working assumption based on "Event related" spots being the required ones for the ending, forcing the user to uncover the truth).
- **Result A Display**:
    - Randomly select one index from `RESULT.SCENARIO_A`.
    - Pass valid segments to `ClickToAdvanceText`.
    - On complete, show the photo result summary (score/images) or "Reset" button.
- **Result B Display**:
    - For now, show placeholder text or a specific "B" scenario if I add one later.


## Verification Plan

### Manual Verification
- **Prologue**:
    - Start app.
    - Verify Prologue text appears one by one on click.
    - Verify style.
    - Verify transition to game.
- **Result**:
    - Play game (capture 2 photos).
    - Verify Result screen shows conversation.
    - Verify Red/White text colors.
    - Verify click advances conversation.
- **Ending**:
    - Complete game (capture correct spots if needed, or force state).
    - Verify Ending text sequence.
