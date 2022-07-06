These endpoints are available to everyone, no need to log in, except for the bottom three that re only available to owner & admin
                 
| Route              | HTTP Verb     | Description                |
| -----------        | -----------   | -----------                |
|  `/trips`          |     GET       |  List of all               |
| `/trips/:id`       |     GET       | Details of a specific trip |   
|   `/trips/create`  |     POST      | Create a new trip          |                                          
| `/trips/:id/edit`  |   PUT/PATCH   | Update a specific trip     |
| `/trips/:id/delete`|    DELETE     | Delete a specific          |




| Route                                 | HTTP Verb     | Description                                                |
| -----------                           | -----------   | -----------                                                |
| `/users`                              | GET           | List of all                                                |
| `/users/:id/myprofile`                | GET           | All details of my profile                                  |
| `/users/:id`                          | GET           | Details of a specific user                                 |
| `/users/:id/rate`                          | POST           | Rate a specific user                                 |
| `/users/:id/rate-list`                          | GET           | All ratings and average of a specific user                                 |
| `/users/signup`                       | POST          | Create a new user                                          |
| `/users/login`                        | POST          | Log in a new user                                          |
| `/users/logout`                       | POST          | Log out                                                    |
| `/users/:id/edit`                     | PUT/PATCH     | Update a specific user                                     |
| `/users/:id/delete`                   | DELETE        | Delete a specific user                                     |




| Route                                 | HTTP Verb     | Description                                                |
| -----------                           | -----------   | -----------                                                |
| `trips/:id/users/:id`                 | GET           | Details of a specific user that belongs to a specific trip |
| `trips/:id/users/:id/delete`          | DELETE        | Delete a specific user from a specific trip                |




<!-- | Route                                 | HTTP Verb     | Description                                                |
| -----------                           | -----------   | -----------                                                |
| `/users/:id/myprofile/car/create`     | POST          | Create a new car                                           |
| `/users/:id/myprofile/car/:id`        | GET           | Details of a specific car                                  |
| `/users/:id/myprofile/car/:id/edit`   | PUT/PATCH     | Update a specific car                                      |
| `/users/:id/myprofile/car/:id/delete` | DELETE        | Delete a specific car                                      | -->



# blabla2
