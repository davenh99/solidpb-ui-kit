import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Kanban } from ".";
import { createMemo, createSignal } from "solid-js";

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
  render: () => {
    const [items, setItems] = createSignal(structuredClone(defaultTasks));
    const [columns, setColumns] = createSignal(structuredClone(defaultColumns));

    /* ----------------------------------------
     * Card drag handling
     * --------------------------------------*/
    const handleCardReorder = (
      item: Task,
      oldPos: number,
      newPos: number,
      oldState: string,
      newState: string,
    ) => {
      setItems((prev) => {
        // console.log(item.title, oldPos, "->", newPos, oldState, "->", newState);
        const next = [...prev];

        // find the moving item (ensure we use the exact reference)
        const moved = next.find((i) => i.id === item.id);
        if (!moved) return prev;

        // close gap in old column
        for (const i of next) {
          if (i.kanbanState === oldState && i.kanbanPosition! > oldPos) {
            i.kanbanPosition!--;
          }
        }

        // open gap in target column
        for (const i of next) {
          if (i.kanbanState === newState && i.kanbanPosition! >= newPos) {
            i.kanbanPosition!++;
          }
        }

        // move the card
        moved.kanbanState = newState;
        moved.kanbanPosition = newPos;

        return next;
      });
    };

    /* ----------------------------------------
     * Column drag handling
     * --------------------------------------*/
    const handleColumnReorder = (col: KanbanState, oldPos: number, newPos: number) => {
      setColumns((prev) => {
        const next = [...prev];
        const moved = next.find((c) => c.id === col.id);
        if (!moved) return prev;

        // shift other columns
        for (const c of next) {
          if (c.statePosition! > oldPos) c.statePosition!--;
          if (c.statePosition! >= newPos) c.statePosition!++;
        }

        // move the column
        moved.statePosition = newPos;
        return next;
      });
    };

    const createNew = (title: string, state: string) => {
      setItems((prev) => {
        const next = [...prev];
        let minPos = 0;
        for (const t of next) {
          if (t.kanbanState === state) {
            minPos = Math.min(minPos, t.kanbanPosition!);
          }
        }
        next.push({
          id: "haha",
          collectionId: "0",
          title: title,
          kanbanPosition: minPos - 1,
          kanbanState: state,
        });
        return next;
      });
    };

    return (
      <Kanban
        items={items()}
        columns={columns()}
        onReorderCard={handleCardReorder}
        onReorderColumn={handleColumnReorder}
        onCreateItem={createNew}
        columnClass="min-h-[80%]"
        containerClass="h-[90vh]"
      />
    );
  },
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
