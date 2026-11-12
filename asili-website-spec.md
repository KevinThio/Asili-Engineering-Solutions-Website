# ASILI Engineering Solutions: Website Spec

## Product name
ASILI Engineering Solutions website

## One line description
A simple company website that shows customers ASILI sizes every electrical system correctly and tests and commissions every circuit, and lets them send an enquiry in under a minute.

## Primary user
A farmer who needs a solar system designed and installed to run an irrigation pump. Today he risks hiring an installer who picks wrongly sized components and leaves circuits unsafe, unprotected and untested.

Also served, but not driving the design: homeowners and commercial/industrial clients needing electrical installations, and people needing a website or mobile app.

## User types and what each can do
Not an app. Nobody logs in.
- **Visitor:** reads the site, sends an enquiry, calls or WhatsApps.
- **Owner:** receives each enquiry by email.

## Core action
The visitor sends a short enquiry: the service needed, their name, phone number and problem. A call/WhatsApp button is the shortcut for people who would rather talk.

## Screens
**1. Home**
- Shows: the main message (correctly sized, tested and commissioned), the three kinds of electrical work (farms, homes, commercial/industrial), and a short mention of websites and mobile apps.
- User can: tap Call or WhatsApp, open the enquiry form, open About & Services.

**2. About & Services**
- Shows: who ASILI is and its qualifications, each service, how ASILI works (design, install, test, commission), and a "Completed projects" strip of cards, each with a photo, the type of work, the location and one line on what was installed.
- User can: scroll through the completed projects, open the enquiry form, tap Call or WhatsApp.

**3. Enquiry form**
- Shows: four fields, then a "we received your enquiry" message after sending.
- User can: send the form, or tap Call or WhatsApp instead.

## Data
**Table: Enquiries**
- Fields: date sent, name, phone number, service needed (farm / home / commercial or industrial / website or mobile app), problem description.
- Written by: the Enquiry form.
- Read by: no screen. Each new enquiry is emailed to the owner, and the table is kept as a backup.

**Table: Projects**
- Fields: title, type of work (farm / home / commercial or industrial), location, short description, photo, date completed.
- Read by: About & Services, which shows the newest six.
- Written by: no screen. The owner adds each new project by hand in the website builder.

The rest of the text on Home and About & Services is fixed page content, so it needs no table.

## Out of scope
- Login or admin page for managing enquiries
- A separate Projects page, or a detail page for each project (add once there are more than about six projects)
- Online prices, quotes, bookings or payments
- Separate pages for website and mobile app services
- AI, mechanical, mechatronics and civil engineering (add when ASILI offers them)
- Blog, customer accounts, live chat

## Brand notes
- Safety and correctness first: properly sized, protected, tested, commissioned.
- Should feel like a qualified engineering firm, not a general handyman.
- Plain language and quick to use on a phone, since customers prefer to call or WhatsApp.
- Colours, logo and overall look were not discussed and still need deciding.
