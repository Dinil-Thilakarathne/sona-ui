---
name: Feature request
about: Suggest an idea for this project
title: "Integrate Sona UI as a Shadcn Registry"
labels: enhancement
assignees: ""
---

**Is your feature request related to a problem? Please describe.**
Currently, Sona UI operates as a standalone component library. While it offers high-quality components, consuming them requires manual copying or specific installation steps that may not align with the increasingly popular `shadcn` ecosystem workflow. Users accustomed to the `shadcn` CLI for adding components may find the current process less streamlined.

**Describe the solution you'd like**
I would like to integrate Sona UI as a fully compatible **shadcn registry**. This involves:

1.  Creating the necessary `registry.json` (or split registry files) that define the components, their dependencies, and file paths.
2.  Ensuring the structure matches the shadcn registry specification so that it works seamlessly with major UI libraries and tools in the industry.
3.  Allowing users to potentially use commands like `npx shadcn@latest add <url>/<component>` (or equivalent) to install Sona UI components.

**Describe alternatives you've considered**

- **Standard NPM Package:** Distributing as a compiled npm package (which loses the "copy-paste" flexibility and customization of shadcn-like libraries).
- **Manual Copy-Paste:** Continuing with the current manual documentation approach, which is functional but has higher friction for users.

**Additional context**
This is a **major goal** for the project. By becoming a shadcn-compatible registry, Sona UI can leverage the existing ecosystem of tools and provide a top-tier developer experience, making it a viable competitor or complement to major UI libraries in the industry.


# page strucute

# header 
## title 
## description
## links


# preview 

# installation

# usage

# example