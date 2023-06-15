# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contact_id/addresses

Headers:
- Authorization: token

Request Body :
```json
{
    "street" : "Jalan qwe",
    "city": "Kota A",
    "province": "Provinsi A",
    "country": "Negara A",
    "postal_code": "Kode Pos"
}
```

Response Body Success :
```json
{
    "data": {
        "id": 1,
        "street" : "Jalan qwe",
        "city": "Kota A",
        "province": "Provinsi A",
        "country": "Negara A",
        "postal_code": "Kode Pos"
    }
}
```

Response Body Error : 
```json
{
    "errors": "Country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contact_id/addresses/:address_id

Headers:
- Authorization: token

Request Body :
```json
{
    "street" : "Jalan qwe",
    "city": "Kota A",
    "province": "Provinsi A",
    "country": "Negara A",
    "postal_code": "Kode Pos"
}
```

Response Body Success :
```json
{
    "data": {
        "id": 1,
        "street" : "Jalan qwe",
        "city": "Kota A",
        "province": "Provinsi A",
        "country": "Negara A",
        "postal_code": "Kode Pos"
    }
}
```

Response Body Error : 
```json
{
    "errors": "Country is required"
}
```

## GET Address API

Endpoint : GET /api/contacts/:contact_id/addresses/:address_id

Headers:
- Authorization: token

Response Body Success :
```json
{
    "data": {
        "id": 1,
        "street" : "Jalan qwe",
        "city": "Kota A",
        "province": "Provinsi A",
        "country": "Negara A",
        "postal_code": "Kode Pos"
    }
}
```

Response Body Error : 
```json
{
    "errors": "Address is not found"
}
```

## List Address API

Endpoint : GET /api/contacts/:contact_id/addresses

Headers:
- Authorization: token

Response Body Success :
```json
{
    "data": [
        {
            "id": 1,
            "street" : "Jalan qwe",
            "city": "Kota A",
            "province": "Provinsi A",
            "country": "Negara A",
            "postal_code": "Kode Pos"
        },
        {
            "id": 2,
            "street" : "Jalan asd",
            "city": "Kota B",
            "province": "Provinsi B",
            "country": "Negara B",
            "postal_code": "Kode Pos"
        }
    ]
}
```

Response Body Error : 
```json
{
    "errors": "Contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contact_id/addresses/:address_id

Headers:
- Authorization: token

Response Body Success :
```json
{
    "data": "OK"
}
```

Response Body Error : 
```json
{
    "errors": "Address is not found"   
}
```
