<!-- Answers to the Short Answer Essay Questions go here -->

1. Describe Middleware, Sessions (as we know them in Express), bcrypt, and JWT.
	- Middleware: Middleware allows you to extrapolate common functionality from routes. They are functions that are passed to server request function calls.
	- Sessions: Sessions are variables that are passed to client side components in the form of cookies. They are used to grant secure access to websites for clients that have been authenticated.
	- bcrypt: Bcrypt is a package that provides a secure hashing function/ algorithm.
	- JWT: JWTs can be used in place of session cookies. They are uniquely generated once a user logs in to a webpage. They expire after a specified amount of time. They are passed to client side components to authenticate users and grant access to restricted information.

2. What does bcrypt do in order to prevent attacks?
	- Bcrypt provides a secure hashing function that generates a unique encoded output for each input. It takes a salt parameter. A salt is a number - the larger the salt, the longer the hashing algorithm will take to encode the input. The longer processing time makes the information more secure because it would take a malicious entity an inordinate amount of time to decrypt the output using brute force.

3. What are the three parts of the JSON Web Token?
	- The three parts of a JSON Web Token are the header, payload and signature.