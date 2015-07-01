export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Default config
  */
  this.namespace = '/api';    // make this `api`, for example, if your API is namespaced
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
    this.get("/users/:id", function(db, request) {
      console.log('get user info');
      return {
        user:  {
              id: 1,
              cell: 1232134,
              username: 'sbsbsbsbsb',
              email: 'hasjdg@qq.com',
              avatar: {url: 'images/user.jpg'},
              real_name: "Dell",
              created_at: "2013-7-4",
              balance: 222222,
              frost: 333333
          }
      };
    });
    // this.get("/users/check_cell_uniqueness", function(db, request) {
    //   return {
    //     message:  "手机号还未被注册"
    //   };
    // });
    this.get("/users/check_cell_uniqueness", {message:  "手机号已被注册"}, 422);
    this.get("/users/check_username_uniqueness", {message:  "该昵称已被使用"}, 422);

    this.get("/users/account", function(db, request) {
      return {
        account:  {
              id: 1,
              balance: 121323,
              frost: 34122
          }
      };
    });

    this.get("/products/:id", function(db, request) {
      return {
        product:  {
              id: 1,
              name: "股指一天期权",
              price: 40,
              date: '2015-6-19',
              benefit: "",
              max: 10
          }
      };
    });

    this.get("/billings",function(db, request) {
      return {
        'billings':  [
          {
            id: 1,
            amount: '12112',
            billing_type: '充值',
            billable_type: '',
            created_at: new Date(),
            state: 'pending',
            billing_number: '20158923891234192',
            remark: '第三方支付'
          },
          {
            id: 2,
            amount: '12112',
            billing_type: '充值',
            billable_type: '',
            created_at: new Date(),
            state: 'pending',
            billing_number: '20158923891234192',
            remark: '第三方支付'
          }
        ],
        "meta": {
            "total_pages": 3
        }
      };
    });

    this.get("/orders",function(db, request) {
      return {
        'orders':  [
          {
            id: 1,
            total_pay: 1000,
            order_type: '看涨',
            earning: '',
            created_at: new Date()
          },
          {
            id: 2,
            total_pay: 400,
            order_type: '看跌',
            earning: -12,
            created_at: new Date()
          }
        ],
        "meta": {
            "total_pages": 2
        }
      };
    });

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  // 用户登录
  this.post('/sessions', function (db, req) {
          return {
              'session': {
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
                      avatar: {url: 'images/user.jpg'},
                      real_name: "Dell",
                      created_at: "2013-7-4",
                      balance: 222222,
                      frost: 333333
                  }
              ]
          };
      });
      // this.post('/user_tokens',{"errors":"Failed"}, 422 );

      // 用户登录
      this.put('/sessions', function (db, req) {
        return {
          'session': {
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
                    avatar: {url: 'images/user.jpg'},
                    real_name: "Dell",
                    created_at: "2013-7-4",
                    balance: 222222,
                    frost: 333333
                  }
              ]
          };
      });

    this.post("/users", function(db, request) {
      var attrs = JSON.parse(request.requestBody);
      console.log(attrs);
      var newUser = db.users.insert(attrs);

      return {
        user:  {
              id: 1,
              cell: 1232134,
              username: 'sbsbsbsbsb',
              email: 'hasjdg@qq.com',
              avatar: {url: 'images/user.jpg'},
              real_name: "Dell",
              created_at: "2013-7-4",
              balance: 222222,
              frost: 333333
          }
      };
    });

    // this.post("/reset_passwords", function(db, request) {
    //   var attrs = JSON.parse(request.requestBody);
    //   console.log(attrs);
    //   var newResetPassword = db.users.insert(attrs);
    //
    //   return {
    //     reset_password:  newResetPassword
    //   };
    // });

    this.post("/reset_passwords",  { errors: {message:['密码错误']}}, 422);

    // this.post("/auths",  { errors: {message:['认证失败']}}, 422);
    this.post("/auths", function(db, request) {
      var attrs = JSON.parse(request.requestBody);
      console.log(attrs);
      var newAuth = db.auths.insert(attrs);

      return {
        auth:  newAuth
      };
    });

    this.post("/orders", function(db, request) {
      var attrs = JSON.parse(request.requestBody);
      console.log(attrs);
      var newOrder = db.auths.insert(attrs);

      return {
        order:  newOrder
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
