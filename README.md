# PublicChatCalculator
By Amber Nelson: ambann115@gmail.com

Live link: https://public-chat-calculator.herokuapp.com/

![Public Chat Calculator](/publicchatcalculator.PNG)

This is a simple, online chat application used as a shared calculator. All users currently online will see each other's calculations. Built using node.js, math.js, express.js, socket.io, and pug. Deployed to the web using heroku.  

### Usage
Mathematical expressions can be typed into the bottom text box and sent to the calculator to be evaluated. The evaluate function in math.js handles all of the string parsing here. The benefit of using math.js here is that it can handle fairly complicated arithmetic without any additional effor on the programming side of this. 

If string evaulation was successful, the results will be posted in the global chat. If an error was encounted due to bad input or otherwise, an error message will be sent only to the person who entered the bad input. 

User sessions are saved, storing the last 10 messages sent in the chat. This makes it so that when the page is refreshed, those 10 messages will still be present.

### Bugs
- User input is currently not preprocessed before being sent to the math.evaluate function and posted to the chat. If this were a larger-scale application, there should be some form of input 'cleaning'.
- Sometimes, when refreshing the page the wrong 10 messages remain (not the most recent 10).

### How to Deploy
The package.json file contains all of the required dependencies this app uses. They can all be installed by using 'npm install' in the top-level of the project directory.

To run the application locally, execute ```node index.js``` in the top-level of the project directory.

### Futher Comments
This was a really great, interesting exercise in my ability to pick up new technologies on my own. This was my first experience building a publicly accessible web app from nothing and I've learned a lot from it. 

If I were to improve and expand upon this, I would want to add some graphing calculator functionality, allow users to set their names, and possibly add a reply system where users could directly respond to others' messages. Making the site friendly for mobile users would also be an important improvement.
