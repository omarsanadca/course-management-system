const isAdmin = (req, res, next) => {
  try {
    if (req.role !== "admin") {
      const err = new Error("Access denied!");
      err.status = 403;
      throw err;
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default isAdmin;

/*
-- 4xx (error from the user)

-- Authentication -> how are u (needs you to login, pass your credentials)
-- Authorization -> what you can do (you need access (admin))

* 400 -> BAD REQ : edit the response body, email is invalid, user with this email already exists
* 401 -> un authorized : needs to pass your credentials
* 403 -> Forbidden : needs access (to be admin)
* 404 -> NOT FOUND, 

*/


/*

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJ1c2VySWQiOjIsInVzZXJFbWFpbCI6ImFAYS5hYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NjkyMTcyNywiZXhwIjoxNzU3MDA4MTI3fQ
.RxFqcM48sunKufHgjhr8mIp83UvZLtHnneymhS-4J7s


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJ1c2VySWQiOjIsInVzZXJFbWFpbCI6ImFAYS5hYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1NjkyMTcyNywiZXhwIjoxNzU3MDA4MTI3fQ
.AWxABXvIU3Yp1V06rN__XyrFvaULCVj86i4-5bmceKE

*/
