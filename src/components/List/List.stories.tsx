import { createMemo } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { ColumnDef } from "@tanstack/solid-table";
import { toaster } from "@kobalte/core/toast";

import { List } from "./List";
import { Image } from "../Image";
import { Tabs } from "../Tabs";
import { Toast, Toaster } from "../Toast";
import { Container } from "../Container";
import { MockProduct } from "../Form/Form.stories";
import { NumberInput } from "../NumberInput";
import { Checkbox } from "../Checkbox";
import { Switch } from "../Switch";

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
};
export default meta;
type Story = StoryObj<typeof List>;

const data: MockProduct[] = [
  {
    name: "Apple iPhone 15",
    price: 999,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Latest Apple smartphone with A17 chip",
    percentageDiscount: 10,
    imageUrl: "https://images.unsplash.com/photo-1592286927505-1fed6c3d8efd?w=400",
    file: "iphone-15.pdf",
  },
  {
    name: "Samsung Galaxy S24",
    price: 899,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Flagship Android phone with AMOLED display",
    percentageDiscount: 5,
    imageUrl: "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400",
    file: "galaxy-s24.pdf",
  },
  {
    name: "Sony WH-1000XM5",
    price: 399,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Noise-cancelling wireless headphones",
    percentageDiscount: 15,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    file: "sony-headphones.pdf",
  },
  {
    name: "Dell XPS 13",
    price: 1299,
    inStock: false,
    category: "electronics",
    sellable: false,
    description: "Ultra-portable laptop with 13-inch display",
    percentageDiscount: 0,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
    file: "dell-xps.pdf",
  },
  {
    name: "Nintendo Switch OLED",
    price: 349,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Handheld gaming console with OLED screen",
    percentageDiscount: 8,
    imageUrl: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400",
    file: "switch-oled.pdf",
  },
  {
    name: "Fitbit Charge 6",
    price: 159,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Fitness tracker with heart rate monitor",
    percentageDiscount: 12,
    imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
    file: "fitbit-charge.pdf",
  },
  {
    name: "Canon EOS R7",
    price: 1499,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Mirrorless camera for enthusiasts",
    percentageDiscount: 20,
    imageUrl: "https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=400",
    file: "canon-r7.pdf",
  },
  {
    name: "Apple Watch Series 9",
    price: 429,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "Smartwatch with health tracking",
    percentageDiscount: 7,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    file: "apple-watch-9.pdf",
  },
  {
    name: "Google Pixel Buds Pro",
    price: 199,
    inStock: false,
    category: "electronics",
    sellable: false,
    description: "Wireless earbuds with ANC",
    percentageDiscount: 0,
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
    file: "pixel-buds.pdf",
  },
  {
    name: "Anker PowerCore 20000",
    price: 45,
    inStock: true,
    category: "electronics",
    sellable: true,
    description: "High-capacity portable charger",
    percentageDiscount: 25,
    imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400",
    file: "anker-powercore.pdf",
  },
];

const columns: ColumnDef<MockProduct>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (ctx) => (
      <NumberInput
        variant="ghost"
        rawValue={ctx.getValue<number>()}
        formatOptions={{ style: "currency", currency: "AUD" }}
        class="w-25"
      />
    ),
  },
  {
    accessorKey: "inStock",
    header: "In Stock",
    cell: (ctx) => <Checkbox checked={ctx.getValue<boolean>()} disabled appearance="neutral" />,
  },
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "sellable",
    header: "Sellable",
    cell: (ctx) => <Switch checked={ctx.getValue<boolean>()} disabled appearance="primary" />,
  },
  {
    accessorKey: "percentageDiscount",
    header: "Discount %",
    cell: (ctx) => <span class="font-bold">{ctx.getValue<number>()}%</span>,
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: (ctx) => <Image class="w-10 h-10" src={ctx.getValue<string>()} />,
  },
  {
    accessorKey: "file",
    header: "File",
  },
];

export const Default: Story = {
  render: () => (
    <Container>
      <Tabs>
        <Tabs.List>
          <Tabs.Trigger value="lst">List</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="lst">
          <List<MockProduct>
            headers
            columns={createMemo(() => columns)}
            data={createMemo(() => data)}
            onRowClick={(r) =>
              toaster.show((props) => (
                <Toast {...props} title="Item clicked" msg={`You clicked on ${r.name}`} />
              ))
            }
          />
        </Tabs.Content>
      </Tabs>
      <Toaster />
    </Container>
  ),
};
