import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Filter, FilterBar, FilterField, FilterGroup } from "./FilterBar";
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
        id: "123",
        operator: "is",
        value: "true",
      },
      {
        field: { type: "number", name: "percentageDiscount", label: "Discount" },
        id: "34",
        operator: "greater_than",
        value: "12",
      },
    ]);
    const [searchValue, setSearchValue] = createSignal("");

    const handleGroupCreate = (
      sourceFilter: Filter<MockProductWithDate>,
      targetFilter: Filter<MockProductWithDate>,
    ) => {
      // Remove both source and target filters from items
      const remainingItems = items().filter((item) => {
        // Check if it's a filter (not a group)
        if ("filters" in item) return true;

        // Keep items that aren't the source or target
        return item.id !== sourceFilter.id && item.id !== targetFilter.id;
      });

      // Create new group
      const newGroup: FilterGroup<MockProductWithDate> = {
        id: crypto.randomUUID(),
        filters: [targetFilter, sourceFilter],
      };

      // Update items with remaining filters + new group
      setItems([...remainingItems, newGroup]);
    };

    const handleAddFilterGroup = (newFilters: Filter<MockProductWithDate>[]) => {
      if (newFilters.length === 1) {
        setItems?.([...(items() || []), newFilters[0]]);
        return;
      }

      const newGroup: FilterGroup<MockProductWithDate> = {
        id: crypto.randomUUID(),
        filters: newFilters,
      };

      setItems?.([...(items() || []), newGroup]);
    };

    return (
      <Container class="flex justify-center h-screen space-x-5">
        <div class="flex gap-2">
          <Button appearance="success" size="md">
            <Plus size={16} /> New
          </Button>
          <FilterBar<MockProductWithDate>
            size="md"
            class="w-160"
            availableFields={availableFields}
            value={searchValue()}
            onChangeValue={setSearchValue}
            items={items()}
            setItems={setItems}
            onFilterRemove={(filter) => setItems((prev) => prev.filter((f) => f.id !== filter.id))}
            onGroupCreate={handleGroupCreate}
            onAddFilterGroup={handleAddFilterGroup}
          />
        </div>
      </Container>
    );
  },
};
