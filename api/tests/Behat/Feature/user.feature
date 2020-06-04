Feature: _User_
  Background:
    Given the following fixtures files are loaded:
      | parameters     |
      | users          |

  Scenario: Login
    Given I have the payload
    """
    {
      "email": "{{ user_1.email }}",
      "password": "change-this-password"
    }
    """
    Given I request "POST /authentication_token"
    Then the response status code should be 200
    # And the response should contain "token"
    # Then print last response

  Scenario: Register
    Given I have the payload
    """
    {
      "email": "reichel2.zetta@hotmail.com",
      "roles": [
        "ROLE_RECRUITER"
      ],
      "password": "new-password",
      "firstname": "Sidiki",
      "lastname": "TOURE",
      "gender": "M",
      "address": "12 Rue de la Chapelle"
    }
    """
    Given I request "POST /users"
    When the response status code should be 201
    # Then print last response
