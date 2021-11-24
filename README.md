Fintech API

## Get Started

        npm install

        npm run dev

### Docker

        docker-compose up -d --build


### Endpoints

Just the one, with different methods (GET, POST, DELETE). There's a few users in the SQLite DB

        /apy/:userId

With existing users:

        http://localhost:3000/apy/1


**Calculate APY**

        POST http://localhost:3000/apy/1

Request Body

        {
            "deposit": 10000,
            "interest_rate": 0.5,
            "yearly_compound_times": 12
        }


**Get Calculation History**

        GET http://localhost:3000/apy/1


**Delete all customer calculation history**

        DELETE http://localhost:3000/apy/1

## Basic Testing with Jest

Only tested the one function.

Why Jest? It's easy, fast and uncomplicated ... but mostly, it's extensible enough to be able to test anything JS, even backend or frontend.


## Caching with LRU

LRU is a little gem, perfect for small projects with not a lot of data - it's simplicity itself.
