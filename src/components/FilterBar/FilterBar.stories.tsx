import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Filter, FilterBar, FilterField, FilterGroup, SortOption } from "./FilterBar";
import { Container } from "../Container";
import { Button } from "../Button";
import Plus from "lucide-solid/icons/plus";

import { productData, type MockProduct } from "../Form/Form.stories";
import { createSignal } from "solid-js";

const meta: Meta<typeof FilterBar> = {
  title: "Components/FilterBar",
  component: FilterBar,
};
export default meta;
type Story = StoryObj<typeof FilterBar>;

interface MockProductWithDate extends MockProduct {
  date: string;
}

const availableFields: FilterField<MockProductWithDate>[] = [
  { type: "text", name: "name", label: "Name" },
  { type: "number", name: "price", label: "Price" },
  { type: "bool", name: "inStock", label: "In Stock" },
  {
    type: "select",
    name: "category",
    label: "Category",
    options: [
      { value: "electronics", label: "Electronics" },
      { value: "clothing", label: "Clothes" },
      { value: "books", label: "Buuk" },
    ],
  },
  { type: "bool", name: "sellable", label: "Sellable" },
  { type: "text", name: "description", label: "Description" },
  { type: "number", name: "percentageDiscount", label: "Discount" },
  { type: "text", name: "imageUrl", label: "Image" },
  { type: "text", name: "file", label: "File" },
  { type: "text", name: "id", label: "Id" },
  { type: "date", name: "date", label: "Date" },
];

export const Default: Story = {
  render: () => {
    const [items, setItems] = createSignal<
      (Filter<MockProductWithDate> | FilterGroup<MockProductWithDate>)[]
    >([
      {
        field: { type: "bool", name: "sellable", label: "Sellable" },
        operator: "is",
        value: "true",
      },
      {
        field: { type: "number", name: "percentageDiscount", label: "Discount" },
        operator: "greater_than",
        value: "12",
      },
      {
        filters: [
          {
            field: { type: "bool", name: "inStock", label: "In Stock" },
            operator: "is",
            value: "true",
          },
          {
            field: { type: "number", name: "percentageDiscount", label: "Discount" },
            operator: "is",
            value: "120",
          },
        ],
      },
    ]);
    const [searchValue, setSearchValue] = createSignal("");
    const [sortBy, setSortBy] = createSignal<SortOption<MockProductWithDate>>();

    // const handleGroupCreate = (
    //   sourceFilter: Filter<MockProductWithDate>,
    //   targetFilter: Filter<MockProductWithDate>,
    // ) => {
    //   // Remove both source and target filters from items
    //   const remainingItems = items().filter((item) => {
    //     // Check if it's a filter (not a group)
    //     if ("filters" in item) return true;

    //     // Keep items that aren't the source or target
    //     return item.id !== sourceFilter.id && item.id !== targetFilter.id;
    //   });

    //   // Create new group
    //   const newGroup: FilterGroup<MockProductWithDate> = {
    //     filters: [targetFilter, sourceFilter],
    //   };

    //   // Update items with remaining filters + new group
    //   setItems([...remainingItems, newGroup]);
    // };

    const handleAddFilterGroup = (newFilters: Filter<MockProductWithDate>[]) => {
      if (newFilters.length === 1) {
        setItems?.([...(items() || []), newFilters[0]]);
        return;
      }

      const newGroup: FilterGroup<MockProductWithDate> = {
        filters: newFilters,
      };

      setItems?.([...(items() || []), newGroup]);
    };

    const handleUpdateFilterGroup = (ind: number, filters: Filter<MockProductWithDate>[]) => {
      setItems((prev) => {
        const updated = [...prev];
        if (filters.length === 1) {
          // Collapse group back to single filter
          updated[ind] = filters[0];
        } else {
          // just in case we do a spread
          updated[ind] = { filters: [...filters] };
        }
        return updated;
      });
    };

    // AI generated could be convoluted, didn't even look at it
    const handleGroupDrag = (sourceInd: number, targetInd: number, sourceFilterGroupInd?: number) => {
      setItems((prev) => {
        const updated = [...prev];

        // Extract the item being dragged
        let draggedItem: Filter<MockProductWithDate> | FilterGroup<MockProductWithDate>;

        if (sourceFilterGroupInd !== undefined) {
          // Dragging a filter OUT of a group
          const sourceGroup = updated[sourceInd] as FilterGroup<MockProductWithDate>;
          draggedItem = sourceGroup.filters[sourceFilterGroupInd];

          // Remove it from the group, or collapse group if only one left
          const remainingFilters = sourceGroup.filters.filter((_, i) => i !== sourceFilterGroupInd);
          if (remainingFilters.length === 1) {
            updated[sourceInd] = remainingFilters[0];
          } else {
            updated[sourceInd] = { filters: remainingFilters };
          }
        } else {
          // Dragging a whole filter/group
          draggedItem = updated[sourceInd];
          updated.splice(sourceInd, 1);

          // Adjust targetInd if needed after splice
          if (targetInd > sourceInd) targetInd--;
        }

        if (targetInd === -1) {
          if (sourceFilterGroupInd !== undefined)
            // Dropped on the bar itself - append to end
            return [...updated, draggedItem];
        }

        // Dropped on another chip - merge into a group
        const targetItem = updated[targetInd];

        if ("filters" in targetItem) {
          // Target is already a group - add to it
          updated[targetInd] = {
            filters: [...targetItem.filters, draggedItem as Filter<MockProductWithDate>],
          };
        } else {
          // Merge source and target into a new group
          updated[targetInd] = { filters: [targetItem, draggedItem as Filter<MockProductWithDate>] };
        }

        return updated;
      });
    };

    return (
      <Container class="flex justify-center h-screen space-x-5">
        <div class="flex gap-1">
          <Button appearance="success">
            <Plus size={16} /> New
          </Button>
          <FilterBar<MockProductWithDate>
            class="md:w-160"
            availableFields={availableFields}
            value={searchValue()}
            onChangeValue={setSearchValue}
            items={items()}
            setItems={setItems}
            onFilterRemove={(ind) => setItems((prev) => prev.filter((_, i) => ind !== i))}
            onAddFilterGroup={handleAddFilterGroup}
            onUpdateFilterGroup={handleUpdateFilterGroup}
            onGroupDrag={handleGroupDrag}
            sortBy={sortBy()}
            setSortBy={setSortBy}
          />
        </div>
      </Container>
    );
  },
};
