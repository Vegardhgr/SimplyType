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
- [ ] Backspace should only work for the current word.
- [ ] Allowing users to designate specific characters for focused practice. 
- [ ] Add CSS.
- [ ] Set up docker. (Just for fun).

Internal improvements:
- [ ] Not have a removed list that contains removed chars. Rather add a boolean to the tuple that states whether the char should be displayed.
- [ ] Rename box.tsx to typing.tsx. Move all logic that is not responsible for rendering the text nor handeling input, out of this component.
