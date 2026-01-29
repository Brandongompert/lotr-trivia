# LOTR Trivia App - Visual Guide

## 🎨 User Interface

### Layout Overview
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│           The Lord of the Rings Trivia              │
│         Test your knowledge of Middle-earth         │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Question 1 of 8              12% Complete          │
│  ▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░          │
│                                                     │
│  ┌───────────────────────────────────────────┐     │
│  │                                           │     │
│  │              QUESTION                     │     │
│  │                                           │     │
│  │   What is the name of Gandalf's sword?   │     │
│  │                                           │     │
│  │            [Weapons] [Medium]             │     │
│  │                                           │     │
│  │       Click to reveal answer              │     │
│  └───────────────────────────────────────────┘     │
│                                                     │
│    [← Previous]  [Reveal Answer]  [Next →]         │
│                                                     │
│        Keyboard: ← → to navigate | Space to reveal │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ⚠️ Fan-Made Content                                │
│  This is an unofficial fan-made trivia website...  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Card Flip Animation

**Front (Question):**
```
┌───────────────────────────────┐
│                               │
│         QUESTION              │
│                               │
│  What is the Elvish word for  │
│  friend, spoken to open the   │
│  Doors of Durin?              │
│                               │
│    [Languages] [Easy]         │
│                               │
│   Click to reveal answer      │
└───────────────────────────────┘
```

**Back (Answer) - After Flip:**
```
┌───────────────────────────────┐
│                               │
│          ANSWER               │
│                               │
│           Mellon              │
│                               │
│                               │
│                               │
│    Click to see question      │
└───────────────────────────────┘
```

## 🎨 Color Scheme

### Main Colors
- **Background**: Gradient from slate-900 → slate-800 → slate-900
- **Card (Question)**: slate-700 with blue-400 border
- **Card (Answer)**: slate-800 with green-500 border
- **Primary Button**: blue-600
- **Secondary Buttons**: slate-700
- **Progress Bar**: Gradient blue-500 → green-500

### States
- **Question State**: Blue accent (#60a5fa)
- **Answer State**: Green accent (#10b981)
- **Disabled**: 40% opacity
- **Hover**: Slight scale up (1.02x)
- **Active**: Slight scale down (0.98x)

## ⌨️ Interactions

### Mouse/Touch
- **Click Card**: Flip to reveal/hide answer
- **Hover Card**: Scale up slightly
- **Click Buttons**: Navigate or toggle answer
- **Hover Buttons**: Color change

### Keyboard
- **Arrow Left/Up**: Previous question
- **Arrow Right/Down**: Next question  
- **Space/Enter**: Reveal/hide answer
- **Tab**: Navigate between buttons (accessibility)

## 📱 Responsive Behavior

### Desktop (>768px)
- Card: Large (max-width: 2xl)
- Text: 3xl for questions, 2xl for answers
- Comfortable spacing

### Mobile (<768px)
- Card: Full width with padding
- Text: 2xl for questions, xl for answers
- Stacked buttons (if needed)
- Touch-friendly targets

## 🎭 Animation Details

### Card Flip
- **Duration**: 0.6s
- **Easing**: ease-in-out
- **Transform**: rotateY(0° → 180°)
- **Trigger**: Click or keyboard

### Progress Bar
- **Duration**: 0.3s
- **Easing**: ease-out
- **Transform**: Width change
- **Trigger**: Navigation

### Button Interactions
- **Hover**: Background color transition (0.2s)
- **Scale**: Subtle feedback on click
- **Focus**: Ring outline for accessibility

## 🎯 User Flow

1. **Landing**: User sees first question with progress
2. **Read**: User reads the question and metadata
3. **Reveal**: User clicks card or presses Space
4. **Answer**: Card flips to show answer
5. **Navigate**: User clicks Next or presses →
6. **Progress**: Progress bar updates, new question loads
7. **Repeat**: Continue through all 8 questions

## 📊 Sample Questions Preview

1. Gandalf's sword name (Medium)
2. Elvish word for friend (Easy)
3. Lord of the Nazgûl (Medium)
4. Aragorn's reforged sword (Easy)
5. Treebeard's language name (Hard)
6. Number of Elven Rings (Easy)
7. Elvish name for Rivendell (Medium)
8. Original bearer of Sting (Hard)

---

The app creates a smooth, modern flashcard experience with subtle animations, clear visual hierarchy, and intuitive controls.
