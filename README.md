# Welcome to the Application! 
Hi dear customer! This file is provided to you by Team 
**Spaten** to help you get familiar with our application **SpielerMinus**. For any questions, feel free to contact our Product Owner **Illya** or his representative **Nicklas**. 
Our entire team is also available to assist you!
# Files 
In the entire package, you receive the application, **admin credentials with a one-time password**, and this manual. ~~Separately, each team member has uploaded their report on their experience in the team and working with the Scrum method on **HVS**.~~ 

## Starting the Application 
Now to the more important things. To start the application locally, you need: An IDE, such as **Intellij**  
**Tutorial for installing Intellij:** [https://www.youtube.com/watch?v=yNDmGkG-3NY](https://www.youtube.com/watch?v=yNDmGkG-3NY) 
To make the usage of the application easier, there is an internal database in the application called **SQLite**, so the user does not need to have a database or database management system on their device. **Steps to Start the Application (Backend)**  
1. Install the IDE. 
2. In the IDE **File>New>** 
	a) Project From Version Control (when cloning from GitHub (recommended): [https://github.com/twoichai/spielerminusapp.git](https://github.com/twoichai/spielerminusapp.git) 
**(<> Code > HTTPS > Copy Link)** 
b) Project From Existing Sources (for .ZIP file)
3. Maven Build 
4. Start the application: Press the "Play Button" in the top right 
5.  The application is running! (at [http://localhost:8080)

**Steps to Start the Application (Frontend) without npm** 
You can also get the application without the need to have npm on your device to build frontend, we will share with you the application with buided frontend, for that you just need to start the backend (step 4.)
**Steps to Start the Application (Frontend) with npm** 
To further enjoy the functionalities, you need to start the frontend additionally. Similar to the backend, you need to load the frontend:
1. go to terminal (usualy at the bottom of the screen)
2. enter **cd frontend** 
3. enter **npm install**
4. enter **npm run build-backend**
5. do the step 4 of starting the backend 

## Using the Application
To use the application, enter the link [http://localhost:8080/ in the browser 
To see the methods which are available right now in backend go to
http://localhost:8080/swagger-ui/index.html
You will be guided to the link after using your otp

--- 
The user will then see the login window. 
**One Time Credentials:**  
**Username:** admin 
**Password:** admin 

--- 
~~### Setting a New Password After entering the credentials, the user must set and confirm a new password.~~ 
The user will see the **Overview**. Here they have the option to: 
1. View the athletes area 
2.  View the exercise catalog 
3.  ~~Change profile~~ 
## Athletes Area 
In the athletes area, the user sees the list of available athletes. It is possible to add athletes manually or by importing a CSV file by pressing the "+" button (see **Importing CSV Files**). Additionally, there is a search function and a "Filter by" function. The user can also click on individual users to view their details. In the detail view, depending on the category, the sports that the selected athlete can participate in are displayed. These are shown to the athlete based on filtering by their current age, gender, and category. ## Exercise Catalog The exercise catalog allows trainers to view all sports and rules currently stored in the database. 
## Importing CSV Files 
The application includes a method: 
**Importing users via a CSV file** 
To do this, the user must be in **the athletes overview** and press **"+"**. A **CSV button** will then appear in the **dropdown menu** to import multiple or individual athletes via CSV file.
 ~~Importing completed exercises via a CSV file~~ --- 
 ## Exporting CSV Files 
 The application includes a method: 
 **to export users**
 this function is not implemented yet in frontend, but as the other functions it can be reached by:
 http://localhost:8080/swagger-ui/index.html#
 where all endpoints are exposed
 ~~export of completed exercises~~
