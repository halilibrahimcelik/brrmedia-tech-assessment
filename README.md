# BRR Media Tech Assessment Internal Dashboard

## Project Overview

The BRR Media Tech Assessment Dashboard is an internal web application designed to streamline workflow management for team members. Built with Next.js, this dashboard provides a central hub for staff information, IT support, ticket tracking, and personal task management.

## Features

### Dashboard

- Welcome banner with personalized greeting
- Quick summary statistics showing open tickets and pending tasks

### Staff Directory

- Comprehensive staff listing with detailed employee information
- Display of key user data including name, role, email, and active status

### IT Request System

- Intuitive request submission form
- Issue type categorization via dropdown menu
- Detailed description field for explaining problems
- File upload capability for attachments
- Request confirmation and submission tracking

### Tickets Management

- View and track all submitted IT support tickets
- Status tracking (Open, Closed)
- Creation dates and ticket details

### To-Do List

- Task management system
- Create, edit, and delete functionality
- Task completion tracking

## Technology Stack

- **Framework**: Next.js 15
- **UI Libraries**: Material UI v7, Tailwind CSS
- **Data Fetching**: React Query
- **Form Management**: React Hook Form with Yup validation
- **State Management**: React Context
- **Data Storage**: Static JSON (simulated API)
- **Testing**: Jest with React Testing Library

## Getting Started

```bash
# Clone the repository
git clone https://github.com/halilibrahimcelik/brrmedia-tech-assessment.git

# Navigate to project directory
cd brrmedia-tech-assessment

# Install dependencies
pnpm install

# Run the development server
pnpm run dev

# Open http://localhost:3000 in your browser
```
