# hannicho1-final-project
# https://hannicho1.github.io/hannicho1-final-project/
# Hannicho final project
# the targeted browsers are both ios and android
## API used umd.io

In this application, umd.io was used to get the information about the courses, routes, and bus schedule
 
# First page
the first page is about the overview of all the data that are pulled from the API,
- course button display three random courses that we get from https://api.umd.io/v1/courses and are changed every time the page loaded or refreshed
 
- bus button display three random routes that we get from https://api.umd.io/v1/bus/routes and are also changed every time the page is loaded or refreshed
 
- schedule button display three random bus schedule that we get from https://api.umd.io/v1/bus/routes/{route_id}/schedules, this means that we first have to get one random route in which we can get the route ID like in the previous step then that route_id is used to get three random routes.
 
# Second page
 
the second page is about the bus route, which shows all the routes from https://api.umd.io/v1/bus/routes
these route can be filtered by name or by route id
when filtering by name only the name that matched is displayed, and when filtering by ID only one route is displayed.
one one route is clicked the map showing that route is displayed. a red circle is also displayed on the map showing the area in which the bus traveled. the marker on the map also show the maximum and minimum position that the bus can reach. all the paths are also displayed
by selecting one path the path is displayed on the map showing the route that can be taken. the data is stored localy to avoid retrieving the data from the API every time
 
# Third page
 
the third page display the information about the bus schedule. this information is gotten from the previous link. All the routes are displayed and filtered the same way on the second page. when a route is selected the information about the schedule of the bus is displayed, which is gotten from https://api.umd.io/v1/bus/routes/${id_selected}/schedules
 
 
# Fourth page
 
the fourth page displays information about all the courses. this information is gotten from https://api.umd.io/v1/courses/list. all the courses are displayed initially which can be filtered by name or by ID to get the detail information about that course
