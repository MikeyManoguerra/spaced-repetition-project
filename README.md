
## App deployed at

[Languages for friday](https://languages-for-friday.netlify.com)

# Friday Night Knowledge
This is app grew out of a project that implements a spaced repetition algorithm. Version 1.0 was for only the german wordset. This version allows for the code-base to work with any language, and users can have multiple languages they are studying. A small script can add a new language (or any subject, for that matter), to the potential subject list. It also should not be too hard to add new words to each subject, and update the user's lists accordingly, either all at once, or as needed.


![image](https://res.cloudinary.com/dgzjr8afn/image/upload/v1556028325/friday-new.png)

### Technologies:

MongoDB Atlas
Mongoose
Express
Node
JWT
React 
Redux
Redux Form
Redux Router

### API Documentation



##### GET ```api/score/:subjectId```

Finds list per userId and subjectId and returns all of the memory scores for the words in that list


##### POST ```api/users```

```
{
  fullname //optional
  username
  password
  subjectId //from dropdown
}

```

##### POST ```api/auth/login```

```
{
  username
  password
}

```

##### POST ```api/auth/refresh```

```
{
  username
}

```

### Next Steps:

New languages can be added very easily, and become available to all users. User lists per subject are only created by request, so there is no need to run a script to update all users at once.

Design a process to expand subjects easily

Add a pronounciation tool, perhaps there is a good library for this?

Add image serving ability, so the app can quiz on non-verbal subjects.


### Authors
Mikey Manoguerra, With equal Version 1.0 contribution by Tyler Crabb

