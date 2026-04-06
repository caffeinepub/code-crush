# Code & Crush

## Current State
In RoadmapPage.tsx, video links in each topic open YouTube in a new tab (`target="_blank"`). There is no in-app video player, no chatbot tied to videos, and no video summary feature.

## Requested Changes (Diff)

### Add
- A `VideoPlayerModal` component that opens when a video link is clicked (instead of navigating to YouTube)
- YouTube embed player inside the modal using the video URL converted to an embed URL
- An AI chatbot panel beside the video (sidebar on desktop, below on mobile) where the user can ask questions about the video topic
- A "Get Summary" button that generates a summary of the video topic using the companion AI (OpenAI/Claude if key set, else local fallback based on topic title)
- Summary displayed as a card below the video or in the chatbot panel

### Modify
- In RoadmapPage.tsx: change all video `<a>` tags from `target="_blank"` to `onClick` handlers that open the in-app VideoPlayerModal
- Pass the video URL, label, and topic context to the modal so the chatbot and summary are context-aware

### Remove
- `target="_blank"` / `rel="noopener noreferrer"` from video links (they now open in-app)

## Implementation Plan
1. Create `VideoPlayerPage.tsx` (full-page view with back button, embedded YouTube player, AI chatbot panel, and summary button)
2. Extract YouTube video ID from URL for embed
3. Add `openVideo` state in RoadmapPage.tsx to render VideoPlayerPage when a video is selected
4. VideoPlayerPage layout: top = YouTube iframe embed, right/bottom = chatbot + summary panel
5. Chatbot uses OpenAI/Claude if API key is in localStorage, else provides topic-based fallback responses
6. "Get Summary" uses AI to summarize what the video is about based on title + topic context, or shows a static summary fallback
