import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Kanban } from ".";
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
  description?: string;
}

export const defaultColumns: KanbanState[] = [
  { id: "todo", title: "To Do", collectionId: "0", statePosition: 0 },
  { id: "in-progress", title: "In Progress", collectionId: "0", statePosition: 1 },
  { id: "review", title: "In Review", collectionId: "0", statePosition: 2 },
  { id: "done", title: "Done", collectionId: "0", statePosition: 3 },
];

export const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Design homepage",
    description: "Create mockups and wireframes",
    kanbanState: "todo",
    priority: "high",
    assignee: "Alice",
    kanbanPosition: 0,
    collectionId: "0",
  },
  {
    id: "2",
    title: "Setup database",
    description: "Configure PostgreSQL and migrations",
    kanbanState: "todo",
    priority: "high",
    assignee: "Bob",
    kanbanPosition: 1,
    collectionId: "0",
  },
  {
    id: "3",
    title: "Implement auth",
    description: "JWT-based authentication",
    kanbanState: "in-progress",
    priority: "high",
    assignee: "Charlie",
    kanbanPosition: 0,
    collectionId: "0",
  },
  {
    id: "4",
    title: "Create API endpoints",
    description: "REST API for user management",
    kanbanState: "in-progress",
    priority: "medium",
    assignee: "Alice",
    kanbanPosition: 1,
    collectionId: "0",
  },
  {
    id: "5",
    title: "Unit tests",
    description: "Test coverage for core modules",
    kanbanState: "review",
    priority: "medium",
    assignee: "Bob",
    kanbanPosition: 0,
    collectionId: "0",
  },
  {
    id: "6",
    title: "Deploy staging",
    description: "Deploy to staging environment",
    kanbanState: "done",
    priority: "low",
    assignee: "Charlie",
    kanbanPosition: 0,
    collectionId: "0",
  },
];

export const Default: Story = {
  render: () => (
    <Kanban<Task, KanbanState>
      items={defaultTasks}
      columns={defaultColumns}
      onCardClick={(item) => console.log("Clicked:", item)}
    />
  ),
};

export const CustomRendering: Story = {
  render: () => (
    <Kanban<Task, KanbanState>
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
      { id: "1", title: "Task One", kanbanState: "todo", collectionId: "0" },
      { id: "2", title: "Task Two", kanbanState: "todo", collectionId: "0" },
      { id: "3", title: "Task Three", kanbanState: "in-progress", collectionId: "0" },
      { id: "4", title: "Task Four", kanbanState: "done", collectionId: "0" },
    ];

    return (
      <Kanban<Task, KanbanState>
        items={minimalTasks}
        columns={defaultColumns}
        renderItem={(item) => <span class="font-medium">{item.title}</span>}
      />
    );
  },
};

export const EmptyColumns: Story = {
  render: () => (
    <Kanban<Task, KanbanState>
      items={[]}
      columns={defaultColumns}
      onCardClick={(item) => console.log("Clicked:", item)}
    />
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
        <Kanban<Task, KanbanState>
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
