import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Kanban, type KanbanItem, type KanbanColumn } from ".";
import { createSignal } from "solid-js";

const meta: Meta<typeof Kanban> = {
  title: "Components/Kanban",
  component: Kanban,
};

export default meta;
type Story = StoryObj<typeof Kanban>;

export interface Task extends KanbanItem {
  priority?: "low" | "medium" | "high";
  assignee?: string;
}

export const defaultColumns: KanbanColumn[] = [
  { id: "todo", title: "To Do", description: "Tasks to be started" },
  { id: "in-progress", title: "In Progress", description: "Currently being worked on" },
  { id: "review", title: "In Review", description: "Awaiting review" },
  { id: "done", title: "Done", description: "Completed tasks" },
];

export const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Design homepage",
    description: "Create mockups and wireframes",
    status: "todo",
    priority: "high",
    assignee: "Alice",
  },
  {
    id: "2",
    title: "Setup database",
    description: "Configure PostgreSQL and migrations",
    status: "todo",
    priority: "high",
    assignee: "Bob",
  },
  {
    id: "3",
    title: "Implement auth",
    description: "JWT-based authentication",
    status: "in-progress",
    priority: "high",
    assignee: "Charlie",
  },
  {
    id: "4",
    title: "Create API endpoints",
    description: "REST API for user management",
    status: "in-progress",
    priority: "medium",
    assignee: "Alice",
  },
  {
    id: "5",
    title: "Unit tests",
    description: "Test coverage for core modules",
    status: "review",
    priority: "medium",
    assignee: "Bob",
  },
  {
    id: "6",
    title: "Deploy staging",
    description: "Deploy to staging environment",
    status: "done",
    priority: "low",
    assignee: "Charlie",
  },
];

export const Default: Story = {
  render: () => (
    <Kanban<Task>
      items={defaultTasks}
      columns={defaultColumns}
      onCardClick={(item) => console.log("Clicked:", item)}
    />
  ),
};

export const CustomRendering: Story = {
  render: () => (
    <Kanban<Task>
      items={defaultTasks}
      columns={defaultColumns}
      renderItem={(item) => (
        <div>
          <div class="font-medium text-sm">{item.title}</div>
          <div class="text-xs text-base-content/60 mt-1">{item.description}</div>
          <div class="flex gap-2 mt-2 items-center">
            <span
              class={`badge badge-sm ${
                item.priority === "high"
                  ? "badge-error"
                  : item.priority === "medium"
                    ? "badge-warning"
                    : "badge-info"
              }`}
            >
              {item.priority}
            </span>
            <span class="text-xs text-base-content/50">{item.assignee}</span>
          </div>
        </div>
      )}
      onCardClick={(item) => console.log("Task clicked:", item)}
    />
  ),
};

export const MinimalCards: Story = {
  render: () => {
    const minimalTasks: Task[] = [
      { id: "1", title: "Task One", status: "todo" },
      { id: "2", title: "Task Two", status: "todo" },
      { id: "3", title: "Task Three", status: "in-progress" },
      { id: "4", title: "Task Four", status: "done" },
    ];

    return (
      <Kanban<Task>
        items={minimalTasks}
        columns={defaultColumns}
        renderItem={(item) => <span class="font-medium">{item.title}</span>}
      />
    );
  },
};

export const EmptyColumns: Story = {
  render: () => (
    <Kanban<Task> items={[]} columns={defaultColumns} onCardClick={(item) => console.log("Clicked:", item)} />
  ),
};

export const Interactive: Story = {
  render: () => {
    const [tasks, setTasks] = createSignal<Task[]>(defaultTasks);

    return (
      <div class="space-y-4">
        <div>
          <p class="text-sm text-base-content/60 mb-4">Click on cards to log to console</p>
        </div>
        <Kanban<Task>
          items={tasks()}
          columns={defaultColumns}
          renderItem={(item) => (
            <div>
              <div class="font-medium text-sm">{item.title}</div>
              {item.priority && (
                <div class="mt-1">
                  <span
                    class={`badge badge-xs ${
                      item.priority === "high"
                        ? "badge-error"
                        : item.priority === "medium"
                          ? "badge-warning"
                          : "badge-info"
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>
              )}
            </div>
          )}
          onCardClick={(item) => {
            console.log("Selected task:", item);
          }}
        />
      </div>
    );
  },
};
