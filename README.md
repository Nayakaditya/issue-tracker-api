# ISSUE TRACKER APIs

An Issue Tracker API to Create Projects and According to the project created issues related to that project and tracker until the project issues resolved.

## Setup

> Copy and Paste in your terminal :
> `git clone https://github.com/Nayakaditya/issue-tracker-api`
> Install all required depencies by :
> `npm install`

## Featues

1. You can create a project using [POST] method

   > http://localhost:5000/api/v1/project/new

2. You can delete a project by its id using [DELETE] method

   > http://localhost:5000/api/v1/project/:id/delete

3. You can get single project details by its id using [GET] method

   > http://localhost:5000/api/v1/project/:id

4. You can get all projects using [GET] method

   > http://localhost:5000/api/v1/projects

5. You can search projects by title and description using [GET] method

   > http://localhost:5000/api/v1/projects/search

6. You can filter projects by its author name using [GET] method

   > http://localhost:5000/api/v1/projects/author

7. You can filter projects by its labels using [GET] method

   > http://localhost:5000/api/v1/projects/labels

8. You can create issue for a particular project using [POST] method

   > http://localhost:5000/api/v1/project/:id/issue/new

9. You can delete issue using [DELETE] method

   > http://localhost:5000/api/v1/project/:id/issue/:issueId/delete

10. You can get particular issue details using [GET] method
    > http://localhost:5000/api/v1/project/:id/issue/:issueId

## .enf file

.env file contains some of these variables in the root directory

1. PORT=5000
2. SESSION_SECRET=session_secret
3. SESSION_NAME=issue-tracker
4. MONGO_URI=mongodb://127.0.0.1:27017/issue-tracker-api-db
