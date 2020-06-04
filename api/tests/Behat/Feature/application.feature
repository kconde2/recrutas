Feature: _Application_
  Background:
    Given the following fixtures files are loaded:
      | parameters   |
      | users        |
      | offers       |
      | applications |

  Scenario: Create application
    Given I authenticate as "APPLICANT"
    Given I have the payload
      """
      {
        "offer": "/offers/{{ offer_1.id }}",
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
    Given I authenticate as "APPLICANT"
    When I request "GET /applications"
    Then the response status code should be 200
    Then print last response

  Scenario: PUT application
    Given I authenticate as "APPLICANT"
    Given I have the payload
      """
      {
        "offer": "/offers/{{ offer_2.id }}",
        "age": "20",
        "motivation": "editing motivation",
        "wage": "400",
        "resume": "editing resume"
      }
      """
    When I request "PUT /applications/{{ application_1.id }}"
    Then the response status code should be 200
