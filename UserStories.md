- [ ] As a staff member, I want to view a list of employees so I can see who’s in the team.
- [ ] As a staff member, I want to submit an IT request so I can get help quickly.
- [ ] As a user, I want to view my submitted IT tickets so I can track their status.
- [ ] As a user, I want to manage a simple to-do list to keep track of my tasks.
- [ ] (Bonus) As an admin, I want to see Google Workspace-like info (last login, Drive storage, device status) for each user.

### Suggested Layout / Pages

1. **Dashboard Page**
   - [x] Welcome banner
   - [x] Quick summary: Open tickets, tasks pending, latest updates
2. **Staff Directory Page**
   - [x] List of staff (cards or table)
   - [x] Info: Name, Role, Email, Status (active/inactive)
   - [x] Bonus: Show “last login”, “Drive storage used”, “device type”
3. **IT Request Page**
   - [x] Form with:
     - [x] Issue Type (dropdown)
     - [x] Description (textarea)
     - [x] File input (simulate upload)
   - [x] “Submit Request” button
4. **Tickets Page**
   - [x] List of submitted tickets
   - [x] Show: Issue Type, Status (Open, In Progress, Resolved), Created Date
5. **To-Do List Page**
   - [x] Add/Edit/Delete tasks
   - [x] Mark task as complete

### Technical Requirements

- [x] React with functional components and Hooks
- [x] State management using useState/useEffect (or Context/Redux if needed)
- [x] Responsive layout using any styling method
- [x] Simulated async (e.g., setTimeout) for ticket submission or API fetching
- [x] Bonus: TypeScript (optional)
- [x] Bonus: Simple router-based navigation (e.g., React Router)

### Bonus Points

- [ ] Reusable components (e.g., Card, FormField, TicketRow)
- [ ] UX polish (e.g., loading states, empty states)
- [ ] Accessibility considerations
- [ ] Unit tests (even basic)
- [ ] Use of Tailwind or MUI
