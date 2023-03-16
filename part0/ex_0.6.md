```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://fullstack-exampleapp.herokuapp.com/new_note
    activate server
    server-->>browser: HTTP status code 201
    deactivate server


    Note right of browser: The browser sent a new note as JSON and renders a new note on the same page
```