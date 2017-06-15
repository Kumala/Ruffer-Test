Feature: Customer-validation
  As an owner
  I want to verify the customer details
  To confirm the transactions will be successful

  Scenario: Validate Customer details - transaction id
    Given I have the customer details
    When I validate the transaction id
    Then it should be a positive number

  Scenario: Validate Customer details - customer id
    Given I have the customer details
    When I validate the customer id
    Then it should not be null

  Scenario: Validate Customer details - transaction id duplication
    Given I have the customer details
    When I validate the transaction id
    Then it should not be a duplicate

  Scenario: Validate Customer details - transaction amount is valid
    Given I have the customer details
    When I validate the transaction amount
    Then it should be a positive number

  Scenario: Validate Customer details - valid product
    Given I have the customer details
    When I validate the product
    Then it should not be null

  Scenario: Validate Customer details - valid date
    Given I have the customer details
    When I validate the datetime
    Then it should be a date

  Scenario: Validate Customer details - Not future date
    Given I have the customer details
    When I validate the datetime
    Then it should not be in future

