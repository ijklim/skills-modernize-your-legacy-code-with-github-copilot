# Test Plan for COBOL Account Management System

This test plan covers the business logic of the current COBOL application, which is an Account Management System. The system allows users to view their account balance, credit (deposit) money, debit (withdraw) money, and exit the application. The initial balance is set to 1000.00.

The test cases are designed to validate the core functionalities and edge cases. Each test case includes steps to simulate user interactions in the console-based application.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|-----------------------|----------------|------------|-----------------|---------------|---------------------|----------|
| TC001 | View initial balance | Application is started, initial balance is 1000.00 | 1. Start the application<br />2. Select option 1 (View Balance) | Displays `Current balance: 001000.00` |  |  |  |
| TC002 | Credit account with positive amount | Application is running, current balance is 1000.00 | 1. Select option 2 (Credit Account)<br />2. Enter credit amount: 50.00 | Displays `Amount credited. New balance: 001050.00` |  |  |  |
| TC003 | View balance after credit | Balance has been credited by 50.00, now 1050.00 | 1. Select option 1 (View Balance) | Displays `Current balance: 001050.00` |  |  |  |
| TC004 | Debit account with sufficient funds | Current balance is 1050.00 | 1. Select option 3 (Debit Account)<br />2. Enter debit amount: 25.00 | Displays `Amount debited. New balance: 001025.00` |  |  |  |
| TC005 | View balance after debit | Balance has been debited by 25.00, now 1025.00 | 1. Select option 1 (View Balance) | Displays `Current balance: 001025.00` |  |  |  |
| TC006 | Attempt to debit more than available balance | Current balance is 1025.00 | 1. Select option 3 (Debit Account)<br />2. Enter debit amount: 2000.00 | Displays `Insufficient funds for this debit.` |  |  |  |
| TC007 | Debit exact balance amount | Current balance is 1025.00 | 1. Select option 3 (Debit Account)<br />2. Enter debit amount: 1025.00 | Displays `Amount debited. New balance: 000000.00` |  |  |  |
| TC008 | Credit account with zero amount | Current balance is 0.00 | 1. Select option 2 (Credit Account)<br />2. Enter credit amount: 0.00 | Displays `Amount credited. New balance: 000000.00` (no change) |  |  |  |
| TC009 | Debit account with zero amount | Current balance is 0.00 | 1. Select option 3 (Debit Account)<br />2. Enter debit amount: 0.00 | Displays `Amount debited. New balance: 000000.00` (no change) |  |  |  |
| TC010 | Enter invalid menu choice | Application is running | 1. Enter choice: 5 | Displays `Invalid choice, please select 1-4.` and shows menu again |  |  |  |
| TC011 | Enter non-numeric choice | Application is running | 1. Enter choice: `a` | Displays `Invalid choice, please select 1-4.` and shows menu again |  |  |  |
| TC012 | Exit the application | Application is running | 1. Select option 4 (Exit) | Displays `Exiting the program. Goodbye!` and terminates |  |  |  |
| TC013 | Multiple operations in sequence | Application is started | 1. View balance<br />2. Credit 100.00<br />3. View balance<br />4. Debit 50.00<br />5. View balance<br />6. Exit | Balances update correctly: 1000 -> 1100 -> 1050, then exit |  |  |  |
| TC014 | Credit with decimal amount | Current balance is 1050.00 | 1. Select option 2 (Credit Account)<br />2. Enter credit amount: 10.50 | Displays `Amount credited. New balance: 001060.50` |  |  |  |
| TC015 | Debit with decimal amount | Current balance is 1060.50 | 1. Select option 3 (Debit Account)<br />2. Enter debit amount: 5.25 | Displays `Amount debited. New balance: 001055.25` |  |  |  |
| TC016 | Attempt debit slightly over balance | Current balance is 1055.25 | 1. Select option 3 (Debit Account)<br />2. Enter debit amount: 1055.26 | Displays `Insufficient funds for this debit.` |  |  |  |
