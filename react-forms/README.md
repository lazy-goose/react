## [What inputs should the form contain?](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/module06/README.md)

Forms Both forms will collect the same data:

- __name__ (validate for first uppercase letter)
- __age__ (should be number, no negative values)
- __email__ (validate for email)
- __password__ / __match password__ (should match, display the password strength: 1 number, 1 uppercase letter, 1 lowercased letter, 1 special character)
- __gender__ (you can use radio buttons or select control)
- __accept T&C__ (checkbox)
- input control to upload __picture__ (validate size and extension, allow png jpeg, save in redux store as base64)
- autocomplete control to __select country__ (all countries should be stored in the Redux store)
