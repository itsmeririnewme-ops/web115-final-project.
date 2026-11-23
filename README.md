# The Lost Explorer

WEB 115 Final Project | Group 6

## Team Members and Roles

- Riyaa: README, flowchart, HTML
- Patrick: JavaScript, story logic, choices, navigation
- Hdung: Story writing, CSS

## Application Overview

### Story

You start playing the game being Bentley, a young adventurer and explorer, who goes into the jungle to rescue Dr. George Reed, a famous adventurer, who disappeared while exploring an ancient civilization in the Amazon rainforest. At the starting point, you discover a torn journal, a broken compass, and a strange map. All these clues show that Dr. Reed discovered an ancient temple, which contains an artifact protected by a secret code and traps.

### Gameplay

The player reads each scene and then presses a button to decide what to do next. The actions to perform are: which clue to follow, which way to go, how to overcome obstacles like river, secret passage, and temple traps. Some paths are shorter than others, and some choices lead to the same scene through another way. The game has three endings: good one, when Dr. Reed is rescued and the mystery is solved, escape ending, when the player escapes without finding the answer, and bad one, when the jungle wins.

### Rules and Navigation

- Players click choice buttons to advance the story.
- Clues from the journal and map can help the player later in the game.
- A restart button appears on ending screens so players can try a different path.

## Story Flowchart

```mermaid
flowchart TD
    A["Start: Dr. Reed's abandoned campsite at dusk"] --> B{"What do you investigate?"}
    B -->|Read the torn journal| C["Journal mentions a hidden temple and a secret code"]
    B -->|Follow the strange footprints| D["Footprints lead to a fast river"]
    B -->|Take the old stone pathway| E["Overgrown ruins with a hidden passage"]
    C --> F{"Use the map or take the pathway?"}
    F -->|Use the map| G["Temple entrance with traps and a code panel"]
    F -->|Take the pathway| E
    D --> H{"Cross the river or follow the bank?"}
    H -->|Cross the river| X["Ending 3: Trapped in the jungle (Bad Ending)"]
    H -->|Follow the bank| E
    E --> K{"Squeeze through the passage or climb the ruins?"}
    K -->|Squeeze through| G
    K -->|Climb the ruins| L["Ending 2: Escape without the truth"]
    G --> M{"Enter the secret code or force the door?"}
    M -->|Enter the code| O{"Find Dr. Reed with the artifact: rescue him or grab it?"}
    M -->|Force the door| X
    O -->|Rescue Dr. Reed| P["Ending 1: Mystery solved, Dr. Reed rescued (Good Ending)"]
    O -->|Grab the artifact| L
```
