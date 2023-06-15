# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers:
- Authorization: token

Request Body :
```json
{
    "first_name": "test",
    "last_name": "asd",
    "email": "test@gmail.com",
    "phone": "123123123"
}
```

Response Body Success :
```json
{
    "data": {
        "id": 1,
        "first_name": "test",
        "last_name": "asd",
        "email": "test@gmail.com",
        "phone": "123123123"
    }
}
```

Response Body Error  :
```json
{
    "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers:
- Authorization: token

Request Body :
```json
{
    "first_name": "test",
    "last_name": "asd",
    "email": "test@gmail.com",
    "phone": "123123123"
}
```

Response Body Success :
```json
{
    "data": {
        "id": 1,
        "first_name": "test",
        "last_name": "asd",
        "email": "test@gmail.com",
        "phone": "123123123"
    }   
}
```

Response Body Error  :
```json
{
    "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers:
- Authorization: token

Response Body Success :
```json
{
    "data": {
        "id": 1,
        "first_name": "test",
        "last_name": "asd",
        "email": "test@gmail.com",
        "phone": "123123123"
    }   
}
```

Response Body Error  :
```json
{
    "errors": "Contact is not found"   
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers:
- Authorization: token

Query Params:
- name: Search by first_nama or last_name, using like query (optional)
- email: Search by email, using like query (optional)
- phone: Search by phone, using like query (optional)
- page: number of page, default 1(optional)
- size: size of page, default 10(optional)


Response Body Success :
```json
{
   "data": [
        {
            "id": 1,
            "first_name": "test",
            "last_name": "asd",
            "email": "test@gmail.com",
            "phone": "123123123"
        },
        {
            "id": 2,
            "first_name": "test",
            "last_name": "qwe",
            "email": "test1@gmail.com",
            "phone": "123123123"
        }    
   ],
   "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
   }
}
```

Response Body Error  :
```json
{
    
}
```

## Remove Contact API

Endpoint: DELETE /api/contacts/:id

Headers:
- Authorization: token

Response Body Success :
```json
{
    "data": "OK"
}
```

Response Body Error  :
```json
{
    "errors": "Contact is not found"   
}
```