Feature: _Offer_

  Scenario: test get offer
    Given I request "GET /offers"
    When the response status code should be 200
    Then print last response

  Scenario: test post offer
    Given I have the payload
    """
    {
      "name": "Developer",
      "companyDetails": "BNP",
      "description": "Developer front",
      "startAt": "2020-06-03",
      "contratType": "cdi",
      "workplace": "Paris",
      "author": "users/1"
    }
    """
    When I request "POST /offers"
    When the response status code should be 201
    Then print last response

  Scenario: test get offer 1
    Given I request "GET /offers/1"
    When the response status code should be 200
    Then print last response

  Scenario: test put offer 2
    Given I have the payload
    """
    {
      "name": "Developers",
      "companyDetails": "BNPZ",
      "description": "Developer frontaa",
      "startAt": "2020-06-03",
      "contratType": "cdi",
      "workplace": "Paris",
      "author": "users/1"
    }
    """
    When I request "PUT /offers/2"
    When the response status code should be 200
    Then print last response

  Scenario: test patch offer 2
    Given I have the payload
    """
    {
      "name": "Devops",
      "workplace": "Brussels"
    }
    """
    When I request "PATCH /offers/2"
    When the response status code should be 200
    Then print last response

  Scenario: test delete offer 3
    Given I request "DELETE /offers/40"
    When the response status code should be 200
    Then print last response