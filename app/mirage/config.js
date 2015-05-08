export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Default config
  */
  this.namespace = '/api/v1';    // make this `api`, for example, if your API is namespaced
  this.timing = 1000;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  // 用户登录
  this.post('/user_tokens', function (db, req) {
          // return {
          //     user_tokens: {
          //         id: 1,
          //         token: 'CFSFSF#$*#',
          //         user_id: 1
          //     },
          //     'users': [
          //         {
          //             id: 1,
          //             cell: 1232134,
          //             username: 'sbsbsbsbsb',
          //             email: 'hasjdg@qq.com',
          //             avatar: {url: 'images/temp/u34.png'},
          //             real_name: "Dell",
          //             created_at: "2013-7-4"
          //         }
          //     ]
          // };
           return {
               'errors': [
                   {'message': '邮箱地址或密码错误', 'fieldName': 'password'}
               ]
           };
          //  res.send(400,
          //      {"errors":{"password":["过短（最短为 8 个字符）"]}}
          //  );
      }, 402);

      // 用户登录
      this.put('/user_tokens', function (db, req) {
        return {
              user_tokens: {
                  id: 1,
                  token: 'CFSFSF#$*#',
                  user_id: 1
              },
              'users': [
                  {
                    id: 1,
                    cell: 1232134,
                    username: 'sbsbsbsbsb',
                    email: 'hasjdg@qq.com',
                    avatar: {url: 'images/temp/u34.png'},
                    real_name: "Dell",
                    created_at: "2013-7-4"
                  }
              ]
          };
      });

    this.post("/users", function(db, request) {
      var attrs = JSON.parse(request.requestBody);
      console.log(attrs);
      var newUser = db.users.insert(attrs);

      return {
        user: newUser
      };
    });

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */
    this.put("/users/:id", function(db, request) {
      var attrs = JSON.parse(request.requestBody);
      console.log(attrs);
      var user = db.users.find(request.params.id);
      var newUser = db.users.update(user,attrs);

      return {
        user: newUser
      };
    });

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection} // returns all the data defined in /app/mirage/fixtures/{collection}.js
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;
      var contact = db.contacts.find(contactId);
      var addresses = db.addresses
        .filterBy('contact_id', contactId);

      return {
        contact: contact,
        addresses: addresses
      };
    });

  */
}
