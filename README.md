# **Sleep Dues Proposal**

How many hours of sleep did you get last night? What about the night before? And the night before that? It's important to track the amount of hours of sleep we're getting at night because it can have significant implications on not only our own health, but also the safety and well-being of everyone else around us. Keep track of your sleep debt and the consequences of it with Sleep Dues. The phrase "I'll sleep when I'm dead" couldn't be more misleading.

# Features & Functionality

This web application will be utilizing Python, Django, Javascript, and HTML/CSS. [Wireframe](https://www.figma.com/file/6m6eiZdYz55CQnMfGJdjiN/Untitled?node-id=0%3A1&t=srCsV7kNidywRmTk-1) and [Initial Design Draft](https://www.figma.com/file/dxywCYvXIJfLL2Iyl0ZmS2/Flat-UI-Browser-(Community)?node-id=0%3A1&t=GoUHq1imtBRYTrtG-1) are available.

- Different users will be able to create profiles that are unique to them based off their Name, age, sex, and average hours of sleep.

- Memojis with different appearances based off sex with different reactions based off sleep scores.

- Sleep scores will be calculated based off age, sex, average hours of sleep, and hours of sleep from the last five days.

- Sleep facts/tips/warnings will be displayed depending on sleep score.

- User will be able to visually track through sleep hour chart and graph the trends associated with their personal sleep pattern.

## Components 
- User will need to create a profile with the following components:
    - Username
    - Password
    - Email
    - Age
    - Sex
    - Estimate of average hours of sleep 

- Initial *Estimate of average hours of sleep* will determine intial sleep score.
 
- Sleep scores will be the following:
    - 5 (very good)
    - 4 (good)
    - 3 (neutral)
    - 2 (bad)
    - 1 (very bad)
    
- *Sex* and *Sleep Score* will determine which Memoji is displayed for the user as well as different information that is displayed for the user underneath the memoji.
    - Sleep score of 5 will output a extremely happy memoji whereas sleep score of 1 will make the memoji look extremely exhausted.
    - High sleep scores will output less warnings whereas low sleep scores will output a higher amount of warnings. 
   
- A graph will be displayed when at least three data points are inputted (graph will be created using [Vis.js](https://visjs.github.io/vis-timeline/examples/graph2d/).)

# Data Models

Django form models will be the following:

    - Name: CharField 
    - Age: IntegerField
    - Email: EmailField
    - Sex: CharField (value given from checkbox)
    - Hours of sleep: Integer Field
    
## Views

    - Login
    - UserMain
    - SignUp
    - AddData
    - UserProfile

# Schedule
- Week 1 (Nov 21 - Nov 25)
   - [ ] ~~Setup Django project and app to connect properly with database~~
   - [ ] Get basic html/css for pages complete w/ input forms
   - [ ] ~~Link html pages with different views~~
   - [x] Create Sleep Facts/Information/Tips/Warnings Database
   - [x] Create Memojis (total: 10)
   - [x] Create Sleep Score algorithm
- Week 2 (Nov 28 - Dec 2)
   - [ ] ~~Create Sleep Score algorithm~~
   - [X] Set up Vis.js for graphs
   - [ ] Create functions to out different memojis and facts/tips/warnings depending on sleep score
   - [X] Setup Django project and app to connect properly with database
   - [ ] Link html pages with different views
- Week 3 (Dec 5 - Dec 9)
   - [ ] Stylize and build functionality as much as possible utilizing GreenSock and javascript prior to deadline
 
