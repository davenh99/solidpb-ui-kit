interface Tag {
  id: string;
  name: string;
  colorHex?: string;
  [key: string]: any;
}

type DraggingState = "idle" | "dragging" | "dragging-over";

interface KanbanItem {
  id: string;
  title: string;
  collectionId: string;
}

interface KanbanState {
  id: string;
  title: string;
  collectionId: string;
}
