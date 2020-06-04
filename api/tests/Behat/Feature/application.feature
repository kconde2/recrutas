Feature: _Application_
  Background:
    Given the following fixtures files are loaded:
      | parameters |
      | users      |
      | offers     |

  Scenario: Create application
    Given I have the payload
      """
      {
        "offer": "/offers/2313",
        "age": "12",
        "motivation": "motivation etc",
        "wage": "3000",
        "resume": "resume"
      }
      """
    When I request "POST /applications"
    Then the response status code should be 201
    Then print last response

  Scenario: Get applications
    When I request "GET /applications"
    Then the response status code should be 200
    Then print last response

  Scenario: PUT application
    Given I have the payload
      """
      {
        "offer": "/offers/2312",
        "age": "20",
        "motivation": "editing motivation",
        "wage": "400",
        "resume": "editing resume"
      }
      """
    When I request "PUT /applications/506"
    Then the response status code should be 200
