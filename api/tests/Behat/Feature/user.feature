Feature: _User_
  Background:
    Given the following fixtures files are loaded:
      | parameters     |
      | users          |

  Scenario: Login successfully
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

  Scenario: Login wrong email not registered
    Given I have the payload
    """
    {
      "email": "wrong@email.com",
      "password": "change-this-passwordx"
    }
    """
    Given I request "POST /authentication_token"
    Then the response status code should be 401

  Scenario: Login wrong password not registered
    Given I have the payload
    """
    {
      "email": "{{ user_1.email }}",
      "password": "change-this-passwordx"
    }
    """
    Given I request "POST /authentication_token"
    Then the response status code should be 401

  Scenario: Register successfully
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

  Scenario: Register without password
    Given I have the payload
    """
    {
      "email": "reichel2.zetta@hotmail.com",
      "roles": [
        "ROLE_RECRUITER"
      ],
      "password": "",
      "firstname": "Sidiki",
      "lastname": "TOURE",
      "gender": "M",
      "address": "12 Rue de la Chapelle"
    }
    """
    Given I request "POST /users"
    Then the response status code should be 500

  Scenario: Register without firstname
    Given I have the payload
    """
    {
      "email": "reichel2.zetta@hotmail.com",
      "roles": [
        "ROLE_RECRUITER"
      ],
      "password": "new-password",
      "firstname": "",
      "lastname": "TOURE",
      "gender": "M",
      "address": "12 Rue de la Chapelle"
    }
    """
    Given I request "POST /users"
    Then the response status code should be 400
    Then the "violations" property should contain 2 items
    Then the "violations.0.message" property should be a string equalling "Le prénom ne peut être vide"
    Then the "violations.1.message" property should be a string equalling "Votre prénom est trop court. 2 caractères ou plus."

  Scenario: Register with bad gender
    Given I have the payload
    """
    {
      "email": "reichel2.zetta@hotmail.com",
      "roles": [
        "ROLE_RECRUITER"
      ],
      "password": "new-password",
      "firstname": "Kaba",
      "lastname": "TOURE",
      "gender": "Mx",
      "address": "12 Rue de la Chapelle"
    }
    """
    Given I request "POST /users"
    Then the response status code should be 400
    Then the "violations.0.message" property should be a string equalling "Vous devez choisir entre M ou F"
    Then the "violations" property should contain 1 item
