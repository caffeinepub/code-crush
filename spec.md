# Code & Crush

## Current State
Full-stack AI study companion app with companion chat, quiz mode, coding problems, dashboard, love call, and study modules. Chat uses OpenAI GPT-3.5-turbo (user key) or local response pool. No Claude API support. No Study Points. No Focus Mode. No companion outfits. Companion images are placeholder paths.

## Requested Changes (Diff)

### Add
- Claude Sonnet 4.5 API support (user key, takes priority over OpenAI)
- Open Trivia DB API CS questions in QuizMode
- Study Points currency (earn via quiz/problems, shown in sidebar/dashboard)
- Companion Outfit Shop (3 outfits per companion, unlock with SP)
- AI Focus Mode (page visibility detection, companion nudges on return)
- New AI-generated companion images (sakura, luna, ember, zen - 256x256)
- Ember companion (playful/energetic, 4th personality)
- Dating app vibe micro-copy and animations

### Modify
- AppContext: add studyPoints, activeOutfit, focusModeEnabled, claudeKey
- StudyApp: callAI (Claude+OpenAI fallback), Focus Mode hook, SP flash, updated copy
- DashboardPage: SP display, Claude key input, Outfit Shop
- QuizMode: Open Trivia DB integration, SP awards
- companions.ts: new image paths, add Ember preset
- OnboardingPage: add Ember as selectable companion

### Remove
- Nothing removed.

## Implementation Plan
1. Update companions.ts with new images and Ember
2. Extend AppContext with new state fields
3. Update StudyApp with callAI, Focus Mode, SP flash
4. Update DashboardPage with SP, Claude key, Outfit Shop
5. Update QuizMode with Open Trivia DB and SP awards
6. Update OnboardingPage to include Ember
