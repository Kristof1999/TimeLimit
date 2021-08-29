# TimeLimit
Limits time spent on specified websites.

Edge/test cases covered:
- cannot add duplicate websites
- deleting the specified website, and not something else
- todo: cannot click stop before start, removing while the timer is ticking (will have to stop the timer)

User story
- if a user adds a new web page, then a new row in the table will appear containing the following cells: the name/URL of the web page, an integer displaying how much time the user has spent on the given day on a website, the start/stop button, the remove button
- if a user clicks on the start button, he/she(/it?) will be redirected to the desired site, and the timer will start ticking, in other terms: it will increase by 1 every 1 second
- if a user clicks on the stop button, the timer will stop increasing
- if a user clicks on the remove button, the given row will be removed, and if decides to add the same row, everything will be new
