Feature: _Offer_
  Background:
    Given the following fixtures files are loaded:
      | parameters |
      | users      |
      | offers     |

  Scenario: test get offer
    Given I authenticate as "RECRUITER"
    Given I request "GET /offers"
    When the response status code should be 200
    Then print last response

  Scenario: test post offer
    Given I authenticate as "RECRUITER"
    Given I have the payload
      """
      {
        "name": "Developer",
        "companyDetails": "BNP",
        "description": "Developer front",
        "startAt": "2020-06-03",
        "contratType": "cdi",
        "workplace": "Paris",
        "author": "users/{{ auth_user.id }}"
      }
      """
    When I request "POST /offers"
    When the response status code should be 201
    Then print last response

  Scenario: test get offer 1
    Given I authenticate as "RECRUITER"
    Given I request "GET /offers/{{ offer_1.id }}"
    When the response status code should be 200
    Then print last response

  Scenario: test put offer 2
    Given I authenticate as "RECRUITER"
    Given I have the payload
      """
      {
        "name": "Developers",
        "companyDetails": "BNPZ",
        "description": "Developer frontaa",
        "startAt": "2020-06-03",
        "contratType": "cdi",
        "workplace": "Paris",
        "author": "users/{{ auth_user.id }}"
      }
      """
    When I request "PUT /offers/{{ offer_2.id }}"
    When the response status code should be 200
    Then print last response

  Scenario: test patch offer 2
    Given I authenticate as "RECRUITER"
    Given I have the payload
      """
      {
        "name": "Devops",
        "workplace": "Brussels"
      }
      """
    Given I set the "Content-Type" header to be "application/merge-patch+json"
    When I request "PATCH /offers/{{ offer_3.id }}"
    When the response status code should be 200
    Then print last response

  Scenario: test delete offer 3
    Given I authenticate as "RECRUITER"
    Given I request "DELETE /offers/{{ offer_4.id }}"
    When the response status code should be 204
    Then print last response
