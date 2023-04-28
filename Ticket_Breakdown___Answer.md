# Tickets:

## 1. Update API-Endpoint for Facilities with the creation CUSTOM_ID for Agents

### Guess:

> Same agents could work for different facilities. Facilities have endpoints to connect agents to them.

### Tasks

- Plan Custom table with CUSTOM_ID, FACILITY_ID, AGENT_ID to link 2 tables FACILITIES & AGENTS;
- Update API Endpoint to allow Facility to create and change CUSTOM_ID for any agent or leave it empty;
- Make sure to have a fallback if the Facility doesn't have CUSTOM_ID to use AGENT_ID;
- Write Unit Test for functionality;

### Acceptance

- Facility can create their own CUSTOM_ID only for connected Agent;
- Agent could have different CUSTOM_ID for different facilities;
- Without CUSTOM_ID agents can connect by their ID;
- CUSTOM_ID should be unique and should be unique inside one facility;
- Unit tests pass;

### Estimation: **8-16 hours**

## 2. Update UI to allow Facilities to create custom ID

### Guess:

> We have UI for every facility to manage their data with the form for Agent connection to the Facility.

### Tasks

- Update UI Form with CUSTOM_ID field with proper validation;
- Update API usage with a new field;
- Write Unit Test for functionality;

### Acceptance

- User could enter CUSTOM_ID to agent connection in UI (create & modify);
- Unit tests pass;

### Estimation: **6-10 hours**

## 3. Update Report Generation with CUSTOM_ID

### Guess:

> This CUSTOM_ID feature is requested only by some Facilities and we don't want to modify logic for old customers

### Tasks

- Update the `getShiftsByFacility` function by using CUSTOM_ID if it's created;
- Update `generateReport` function to use CUSTOM_ID when generating report;
- Write integration test to be sure that CUSTOM_ID applied as expected;
- Deploy feature to production;

### Acceptance

- PDF Report contains CUSTOM_ID property instead of AGENT_ID if it's created by Facility;
- PDF Report for Facilities without CUSTOM_ID shows AGENT_ID;
- After pushing the whole feature to production all projects should be work as before without any migration;
- Integration tests pass;

### Estimation: **12-24 hours**
