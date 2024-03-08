Features:
- [x] Retrieve words from a text file.
- [x] Validate if the typed char matches char in word retrieved from text file.
- [x] Add a countdown timer.
- [x] Stop timer when timer reaches zero.
- [x] Add reset button. Set timer to initial value, and retrieve new words from text file.
- [x] Display the number of correct and wrong characters.
- [x] Display the number of correct words. One word is equivalent to five keystrokes.
- [x] Display accuracy. 
- [x] Save high score locally in the browser.
- [x] Add button to decide whether new high score should be saved.
- [x] Add button to clear high score.
- [x] Backspace should only work for the current word.
- [x] Drop-down list to support other languages.
- [x] Drop-down list to select time.
- [ ] Allowing users to designate specific characters for focused practice.
- [ ] Add a simulation that shows previous typing speed. Visualizes how fast you currently type compared to previous round.
- [ ] Add bots to compete with.
- [ ] Add CSS.
- [ ] Set up docker. (Just for fun).

Internal improvements:
- [x] Not have a list that contains removed chars. Rather add a boolean to the tuple that states whether the char should be displayed.
- [x] Rename box.tsx to typing.tsx. Move all logic that is not responsible for rendering the text nor handeling input, out of this component.
- [ ] Place the words in a useState-variable to reduce fetch-calls on every rerender.
