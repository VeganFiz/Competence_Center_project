# Competence Center — Website & Telegram Bot

A digital solution developed for **COMPETENCE CENTER LLP**, a legal services company in Almaty, Kazakhstan. The project combines a corporate website with a Telegram bot to improve access to legal service information and simplify consultation requests.

## Overview

The project consists of two main components:

- **Corporate Website** — presents the company, its legal services, team, and contact information.
- **Telegram Bot** — provides service information, answers frequently asked questions, and guides users through the consultation booking process.

The website serves as the company's online presence, while the Telegram bot provides an interactive way for potential clients to request a consultation.

## Features

### Corporate Website

- Company introduction and overview
- Legal services information
- Team and company information
- Contact details
- Responsive layout for desktop and mobile devices
- Navigation to the Telegram bot for consultation requests
- Basic SEO-oriented page structure

### Telegram Bot

- `/start` command and interactive main menu
- Legal services and pricing information
- Frequently Asked Questions (FAQ)
- Step-by-step consultation booking
- Collection of client contact information
- Legal issue category selection
- Preferred consultation time selection
- Input validation
- Booking data storage
- Administrator notification about new requests

## Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Website structure | HTML5 | Defines page structure and content |
| Website styling | CSS3 | Controls layout and visual appearance |
| Client-side interactions | JavaScript | Implements interactive behavior |
| Responsive design | Bootstrap 5 | Provides responsive layouts and UI components |
| Telegram bot | Python 3 | Implements bot logic |
| Telegram Bot Framework | aiogram | Handles Telegram messages, commands, and user interactions |
| Database | SQLite | Stores consultation booking data |
| Backend/API | FastAPI | Provides an API layer for backend operations |
| UI/UX Design | Figma | Used for interface planning and wireframes |

## System Architecture

The project separates the company's public website from the interactive Telegram bot.

```text
                        CLIENT
                          |
              +-----------+-----------+
              |                       |
              v                       v
      CORPORATE WEBSITE        TELEGRAM BOT
      HTML5 / CSS3             Python 3
      JavaScript               aiogram
      Bootstrap 5                  |
              |                    v
              |              Booking Workflow
              |                    |
              |                    v
              |              Input Validation
              |                    |
              |                    v
              |             Backend / API
              |               FastAPI
              |                    |
              |                    v
              |                 SQLite
              |                    |
              |                    v
              |          Booking Data Storage
              |                    |
              |                    v
              |          Administrator Alert
              |
              v
      Telegram Bot Link
```

**Important:** The website's Telegram button directs users to the bot. FastAPI and SQLite are part of the documented backend stack; their exact runtime integration should be confirmed against the current source code.

## Website Logic

The corporate website provides visitors with essential information about the company.

### Main Sections

1. **Home** — introduction to the company and main calls to action.
2. **About** — company background, mission, and principles.
3. **Services** — information about legal services.
4. **Team** — information about the company's legal professionals.
5. **Contact** — contact information and a link to the Telegram bot.

### Website Workflow

1. A visitor opens the website in a browser.
2. The browser loads the website's HTML, CSS, JavaScript, and related assets.
3. The visitor reviews the company's services and information.
4. The visitor selects the consultation call to action.
5. The visitor proceeds to the Telegram bot to submit a request.

HTML5 defines the content structure, CSS3 controls the presentation, JavaScript supports client-side interactions, and Bootstrap 5 helps adapt the layout to different screen sizes.

## Telegram Bot Logic

The Telegram bot helps potential clients obtain information and submit consultation requests without having to call the company first.

### Main Menu

The bot provides access to the following functions:

- Services and Prices
- FAQ
- Book a Consultation

### Consultation Booking Workflow

The booking process follows a sequence of conversation states:

```text
START
  |
  v
MAIN MENU
  |
  v
BOOK A CONSULTATION
  |
  v
ENTER FULL NAME
  |
  v
ENTER PHONE NUMBER
  |
  v
SELECT ISSUE CATEGORY
  |
  v
SELECT PREFERRED TIME
  |
  v
CONFIRM REQUEST
  |
  v
SAVE BOOKING
  |
  v
NOTIFY ADMINISTRATOR
```

The bot collects the following information:

- Client's full name
- Contact phone number
- Legal issue category
- Preferred consultation time

The bot validates user input and guides the client through the required steps. If the entered information is invalid, the user is asked to provide it again.

### Database Logic

SQLite is used as a lightweight database for booking records.

The intended data workflow is:

1. Collect booking details through the Telegram conversation.
2. Validate the supplied information.
3. Save the booking record.
4. Notify the administrator about the new request.

Access to stored client information should be restricted to authorized users.

## Getting Started

### Prerequisites

- Git
- A modern web browser
- Python 3 for the Telegram bot
- Telegram account and bot token for bot testing
- Dependencies and configuration required by the project

### Clone the Repository

```bash
git clone <repository-url>
cd Competence_center_project
```

Replace `<repository-url>` with the actual URL of the GitHub repository.

### Run the Website

Open the website's HTML entry point in a browser or use a local development server if required by the project.

Keep the existing directory structure intact so that stylesheets, scripts, images, and other assets can be loaded correctly.

### Run the Telegram Bot

The exact startup command depends on the bot's entry-point file and current project configuration.

General steps:

1. Install the required Python version.
2. Install the dependencies listed in the project's dependency file, if available.
3. Create a Telegram bot through [BotFather](https://t.me/BotFather).
4. Configure the bot token using an environment variable or a local `.env` file.
5. Configure the database and any required API settings.
6. Start the bot using the appropriate entry-point file.

Refer to the source code and configuration files for the exact commands and required environment variables.

## Security Considerations

- Never commit Telegram bot tokens, passwords, API keys, or other secrets to GitHub.
- Store sensitive configuration in environment variables or a local `.env` file.
- Add `.env`, virtual environments, and local database files to `.gitignore` where appropriate.
- Validate incoming user data before storing it.
- Restrict access to client booking records.
- Back up the database regularly.
- Test changes with non-production data before deployment.

## Testing

The following areas should be checked during development:

### Website Testing

- Page layout and responsive behavior
- Navigation between sections
- Correct display of company and service information
- Contact links and Telegram bot integration
- Browser compatibility

### Telegram Bot Testing

- `/start` command and main menu
- Services and FAQ responses
- Consultation booking workflow
- Required-field validation
- Phone-number format validation
- Independent conversation states for different users
- Booking persistence
- Administrator notifications

## Future Improvements

Potential future enhancements include:

- CRM integration with platforms such as Bitrix24 or amoCRM
- AI-assisted FAQ responses and initial classification of legal requests
- Improved SEO and legal-information content
- Automated database backups
- Booking analytics and reporting
- Expanded monitoring and deployment automation

## Project Context

This project was developed as part of an educational production practice project for **COMPETENCE CENTER LLP**.

The goal was to establish an online company presence and simplify the initial consultation-request process through a corporate website and a Telegram bot.

The project demonstrates the use of frontend web technologies, Python-based bot development, database storage, and backend/API concepts in a practical business scenario.

## Documentation

The project has separate technical documentation for its two main components:

- **Website Documentation** — website technology stack, page structure, and frontend logic.
- **Telegram Bot Documentation** — bot technology stack, conversation states, booking workflow, and data handling.

---

**Project:** Competence Center Website & Telegram Bot  
**Organization:** COMPETENCE CENTER LLP  
**Location:** Almaty, Kazakhstan  
**Category:** Web Development / Telegram Bot Automation

*Note: The architecture and features described here reflect the documented project design. Verify startup commands, dependencies, and API integration details against the current source code before deployment.*
