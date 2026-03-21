# Code & Crush

## Current State
Fully functional AI study companion app with: landing page (hero, features, companions, study modules), onboarding (username + companion name + personality picker), study chat with topic selection, quiz (MCQ), and Love Call modal using browser speech synthesis. Chat uses a shuffle queue to avoid repetition but still relies on a fixed preset response pool.

## Requested Changes (Diff)

### Add
- **Problems section** on the landing page below the Features section: A "Code Studio" grid of coding problems (Easy/Medium/Hard) matching the screenshots. Each card shows difficulty badge, topic tag, problem title, description, and a Start button.
- **Problem Solver page** (`ProblemsPage.tsx`): Clicking Start on a problem opens a full problem-solving view with: problem statement with input/output description + examples, a code editor (textarea styled like a dark IDE with line numbers), a Submit Solution button, Relationship Progress bar (solved/attempted), and a companion chat panel with a "Get Hint" button. Matches the layout in the screenshots exactly.
- **Email + Password fields** in the OnboardingPage step 1 (after username), stored in user state for identification display.
- **Speech recognition** in the LoveCallModal: after the companion finishes speaking, activate the Web Speech API (SpeechRecognition) to listen to the user's response and show a transcript. The companion then responds to what the user said.
- **New page type** `"problems"` added to AppPage in AppContext.

### Modify
- **LandingPage**: Insert Problems/Code Studio section below the Features section with 10 coding problems in a grid.
- **OnboardingPage step 1**: Add email and password input fields.
- **AppContext**: Add `"problems"` to AppPage type, add `email` and `password` fields to UserState.
- **App.tsx**: Render ProblemsPage when page === "problems".
- **quizData.ts**: Add significantly more MCQ questions per topic (at least 5 per topic, total 25+).
- **StudyApp**: Add Problems button in sidebar and mobile header.
- **LoveCallModal**: Add speech recognition to listen after companion speaks; display user's speech transcript; companion replies.
- **Chat responses**: Expand the companion response pool significantly with many more varied responses per category.

### Remove
- Nothing removed.

## Implementation Plan
1. Update `AppContext.tsx` to add `"problems"` page, `email`/`password` to UserState.
2. Update `quizData.ts` with more MCQ questions (5+ per topic).
3. Update `OnboardingPage.tsx` to add email/password fields in step 1.
4. Create `ProblemsPage.tsx` with full problem-solving UI (problem statement, code editor, submit, hint, companion chat).
5. Update `LandingPage.tsx` to add Code Studio / Problems section below Features.
6. Update `StudyApp.tsx` to add Problems navigation button.
7. Update `LoveCallModal.tsx` to add SpeechRecognition listening after companion speaks.
8. Update `App.tsx` to route to ProblemsPage.
9. Expand companion response pools in `companions.ts` for more variety.
