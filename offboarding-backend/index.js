const express = require("express");

const app = express();

app.all("*", (request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  response.header("Content-Type", "application/json; charset=utf-8");
  next();
});

app.get("/users", (request, response) => {
  response.json([
    {
      id: "1",
      name: "John Doe",
      department: "Engineering",
      status: "ACTIVE",
      email: "some.email@wp.pl",
      equipments: [
        {
          id: "1",
          name: "Macbook air",
        },
        {
          id: "2",
          name: "Magic Mouse",
        },
      ],
    },
    {
      id: "2",
      name: "John Nowak",
      department: "IT",
      status: "OFFBOARDED",
      email: "some.other.email@wp.pl",
      equipments: [
        {
          id: "1",
          name: "Macbook air",
        },
        {
          id: "2",
          name: "Magic Mouse",
        },
      ],
    },
    {
      id: "3",
      name: "John Nowakowski",
      department: "Human Resources",
      status: "ACTIVE",
      email: "some.another.email@wp.pl",
      equipments: [
        {
          id: "1",
          name: "Macbook air",
        },
        {
          id: "2",
          name: "Magic Mouse",
        },
      ],
    },
    {
      id: "4",
      name: "John Nowaczkiewicz",
      department: "Engineering",
      status: "ACTIVE",
      email: "nice.email@wp.pl",
      equipments: [
        {
          id: "1",
          name: "Macbook air",
        },
        {
          id: "2",
          name: "Magic Mouse",
        },
      ],
    },
    {
      id: "5",
      name: "John Nowaczyk",
      department: "Engineering",
      status: "OFFBOARDED",
      email: "other.nice.email@wp.pl",
      equipments: [
        {
          id: "1",
          name: "Macbook air",
        },
        {
          id: "2",
          name: "Magic Mouse",
        },
      ],
    },
  ]);
});

app.get("/users/:id", (request, response) => {
  response.json({
    id: request.params.id,
    name: "John Doe",
    department: "Engineering",
    email: "some.email@wp.pl",
    status: "ACTIVE",
    equipments: [
      {
        id: "1",
        name: "Macbook air",
      },
      {
        id: "2",
        name: "Magic Mouse",
      },
    ],
  });
});
app.post("/users/:id/offboard", (request, response) => {
  response.json({
    id: request.params.id,
    address: {
      streetLine1: "Kocmyrzowska 1",
      country: "Poland",
      postalCode: "13-231",
      receiver: "Stefan Batory",
    },
    notes: "some text",
    phone: "+48123123123",
    email: "some.email@gmail.com",
  });
});

app.listen(3000, () => {
  console.log("Our app is listening for request on port 3000");
});
