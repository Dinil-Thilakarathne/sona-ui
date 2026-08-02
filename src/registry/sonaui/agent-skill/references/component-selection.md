# Component Selection

Use intent, constraints, and interaction shape to select a Sona UI item.

Start with the user's job:

- Local view switching → tabs.
- Focused confirmation or short task → dialog.
- Progressive disclosure → accordion or dropdown.
- Deliberate destructive action → hold-to-delete.
- Atmospheric visual depth → shader or spotlight effect.
- Short decorative typography → text motion resource.

Compare every plausible item's `useWhen`, `avoidWhen`, accessibility, motion, and dependency fields before installation. Selection is complete when one candidate—or the decision to use no Sona component—is justified against all five fields. If the request needs a general navigation system, choose a navigation pattern rather than forcing local tabs into that role.
