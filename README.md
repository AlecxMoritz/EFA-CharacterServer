# EFA Character Server

To get this project up and running, clone, run `npm i`, and create a `.env` with the bellow, and create a local database for the project.

```
DB_NAME=
DB_USER=
DB_PASS=
PORT=
SECRET=
```

## Models

### User

```
id: UUID v4
name: string;
email: string;
password: string;
isAdmin: boolean;
```

### Character
```
id: UUID v4
name: string;
race: string;
bio: string;
faction: string;
str: integer;
dex: integer;
con: integer;
chr: integer;
wis: integer;
int: integer;
```

## Routes

### Users

#### POST /sign-up

```
{
  "user": {
    "name": "Lil Nas X",
    "email": "lil@nas.x",
    "password": "montero"
  }
}
```

#### POST /sign-in
```
{
  "credentials": {
    "email": "lil@nas.x",
    "password":"montero"
  }
}
```

#### GET /profile/[id]
no body for request

#### PUT /update/[id]
```
{
  "user": {
     "name": "Lil Nas X",
     "email": "lil@nas.x",
     "password": "oldtownroad"
   }
}
```

#### /elevate/[id]
No request body. This route must be called by an admin user to elevate another user to admin status.

### Characters

#### POST /new
```
{
  "character": {
    "name": "Cheff Goldbloom",
    "bio": "watching out for hot butter",
    "faction": "Tim and Eric"
  }
}
```

#### PUT /edit/[id]
```
{
  "character": {
    "name": "Cheff Goldbloom",
    "bio": "watching out for hot butter",
    "faction": "Tim and Eric",
    "int": 16,
    "wis": 16,
    "chr": 20
  }
}
```

#### GET /all/[limit]/[offset]
No body for request. 

#### GET /user/[id]/[limit]/[offset]
No body for this one either.

#### GET /[id]
still no.

#### DELETE /[id]
yeah no.
