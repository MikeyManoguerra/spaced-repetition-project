
## App deployed at

[Languages for friday](https://www.friday-night-knowledge.netlify.com)

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

##### GET ```api/learn/:subjectId

Finds user's list by subjectId and returns the word the current word on that list, the list head.

```
//res.body

  {
    wordId,
    mValue: Number,
    foreignLanguage: String
  }

```

##### POST ```api/learn/

Processes User answer and returns the results of their guess.

```
//req.body
  
  {
    subjectId,
    foreignLanguage: String,
    userAnswer: String
  }

  //res.body

  {
    correct: Boolean,
    mValue: String,
    foreignLanguage: String,
    nativeLanguage: String,
    userAnswer: String
  }

```


##### GET ```api/subjects```

Gets all available subjects.

```
//res.body
[
  {
    subjectId,
    subject: String
  }
]


```

##### GET ```api/subjects/userSubjects```

Uses req.user to get list of user's subjects from user object in database

```
//res.body
[
  {
    subjectId,
    subject: String
  }
]


```

##### POST ```api/subjects/:subjectId```

Server creates subject lists per user as needed, so if user wants to study a new subject, this route will create that user list.

```
//res.body
{
status:204
}
```




##### GET ```api/score/:subjectId```

Finds list per userId and subjectId and returns all of the memory scores for the words in that list.

```
//res.body
[
  {
    foreignLanguage: String,
    mValue: Number
  },
  {
  ...
  },
  {
  ...
  },
]


```

##### POST ```api/users```

Creates a new user.

```
//req.body
{
  fullname: String, //optional
  username: String,
  password: String,
  subjectId: String //from dropdown
}

// res.body
{
  authToken: String
}

```

##### POST ```api/auth/login```

Login route.

```
// req.body
{
  username: String,
  password: String
}

// res.body
{
  authToken: String
}

```

##### POST ```api/auth/refresh```

Periodic refresh Route.

```
// req.header
Authorization: Bearer ${token}

// res.body
{
  authToken: String
}

```

### Next Steps:

New languages can be added very easily, and become available to all users. User lists per subject are only created by request, so there is no need to run a script to update all users at once.

Design a process to expand subjects easily

Add a pronounciation tool, perhaps there is a good library for this?

Add image serving ability, so the app can quiz on non-verbal subjects.


### Authors
Mikey Manoguerra, With equal Version 1.0 contribution by Tyler Crabb

