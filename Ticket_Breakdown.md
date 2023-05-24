# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

- Ticket 1: Allow Facilities to save custom IDs for Agents

    ### Description:
    Currently, the reports generated for Facilities display the internal database IDs of Agents. The goal of this ticket is to enhance the system by allowing Facilities to save their own custom IDs for the Agents they work with. This will enable the generation of reports using the custom IDs instead of the internal database IDs.

    ### Acceptance Criteria:
    Add a new field for custom IDs in the Agents table.
    Update the user interface to allow Facilities to input and save custom IDs for each Agent.
    Modify the "generateReport" function to use the custom ID when generating reports instead of the internal database ID.
    The custom IDs should be unique within each Facility.
    Ensure that the custom IDs are properly stored and retrieved from the database.
    Verify that the reports now display the custom IDs instead of the internal database IDs.

    ### Implementation Details:
    Add a new column named "custom_id" to the Agents table in the database schema.
    Update the user interface forms and views to include a field for custom IDs and modify the data persistence logic to save the custom IDs.
    Modify the "generateReport" function to retrieve the custom ID for each Agent from the database based on the Facility's ID.
    Update the report generation logic to include the custom IDs in the generated PDF.
    Implement validation to ensure that custom IDs are unique within each Facility.
    Update the necessary database queries and stored procedures to handle the custom ID field.
    Perform database migrations to add the new column to the existing Agents table.
    Time/Effort Estimate:
    This ticket is estimated to take approximately 8-12 hours to complete, considering database schema changes, UI modifications, backend logic updates, and testing.

- Ticket 2: Update Shifts metadata retrieval to include custom Agent IDs

    ### Description:
    Currently, when retrieving Shifts for the reports, the metadata about the assigned Agent includes their internal database ID. This ticket aims to update the "getShiftsByFacility" function to include the custom IDs assigned by Facilities in the Shifts metadata.

    ### Acceptance Criteria:
    Modify the "getShiftsByFacility" function to fetch the custom IDs for each Agent along with other Shift metadata.
    Ensure that the custom IDs are returned in the response in a structured format.
    Validate that the returned Shift metadata includes the custom Agent IDs.

    ### Implementation Details:
    Update the database query in the "getShiftsByFacility" function to fetch the custom IDs from the Agents table for each Shift's assigned Agent.
    Modify the data structure of the response object to include the custom Agent IDs.
    Test the updated function to confirm that the custom IDs are being retrieved and included in the Shifts metadata.
    Time/Effort Estimate:
    This ticket is estimated to take approximately 2-4 hours to complete, considering the modifications required in the "getShiftsByFacility" function and related tests.

- Ticket 3: Validate uniqueness of custom Agent IDs within a Facility

    ### Description:
    To prevent conflicts and ensure data integrity, it is necessary to validate that the custom Agent IDs entered by Facilities are unique within each Facility. This ticket focuses on implementing the necessary validation checks during the custom ID input process.

    ### Acceptance Criteria:
    Add validation logic to check for uniqueness of custom Agent IDs within each Facility.
    Display appropriate error messages if a duplicate custom ID is entered for an Agent within a Facility.
    Ensure the validation occurs when saving or updating custom IDs for Agents.

    ### Implementation Details:
    Implement server-side validation logic to check for the uniqueness of custom Agent IDs within a Facility. This can be done by querying the Agents table for other Agents within the same Facility with the same custom ID.