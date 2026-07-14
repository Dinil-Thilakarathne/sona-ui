# Component Selection

Use intent, constraints, and interaction shape to select a Sona UI item.

Start with the user's job:

- Local view switching → tabs.
- Focused confirmation or short task → dialog.
- Progressive disclosure → accordion or dropdown.
- Deliberate destructive action → hold-to-delete.
- Atmospheric visual depth → shader or spotlight effect.
- Short decorative typography → text motion resource.

Compare the selected item's `useWhen`, `avoidWhen`, accessibility, motion, and dependency fields before installation. If the request needs a general navigation system, do not force a local tabs component into that role.
